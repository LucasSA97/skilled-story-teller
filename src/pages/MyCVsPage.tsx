
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCVContext } from "@/context/CVContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { TemplateType } from "@/types";
import { CVsHeader } from "@/components/CVs/CVsHeader";
import { CVLimitWarning } from "@/components/CVs/CVLimitWarning";
import { CVsLoading } from "@/components/CVs/CVsLoading";
import { EmptyCVState } from "@/components/CVs/EmptyCVState";
import { CVsList } from "@/components/CVs/CVsList";
import { SaveCVDialog } from "@/components/CVs/SaveCVDialog";

interface SavedCV {
  id: string;
  name: string;
  template: TemplateType;
  created_at: string;
  updated_at: string;
}

const MyCVsPage = () => {
  const { user } = useAuth();
  const { cvState, setTemplate } = useCVContext();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [cvName, setCVName] = useState("");
  const [savingCV, setSavingCV] = useState(false);

  useEffect(() => {
    const fetchSavedCVs = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("cvs")
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
          
        if (error) throw error;
        
        // Map the response to ensure template is of type TemplateType
        const typedCVs = (data || []).map(cv => ({
          id: cv.id,
          name: cv.name,
          template: cv.template as TemplateType,
          created_at: cv.created_at,
          updated_at: cv.updated_at
        }));
        
        setSavedCVs(typedCVs);
      } catch (error: any) {
        console.error('Error fetching CVs:', error.message);
        toast.error(t("deleteError"));
      } finally {
        setLoading(false);
      }
    };

    fetchSavedCVs();
  }, [user, t]);

  const handleCreateCV = () => {
    navigate('/form');
  };

  const handleViewCV = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("cvs")
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (data && data.data) {
        // Load CV data into context
        setTemplate(data.template as TemplateType);
        // Navigate to preview with CV data
        navigate('/preview');
      }
    } catch (error: any) {
      console.error('Error loading CV:', error.message);
      toast.error(t("loadError"));
    }
  };

  const handleEditCV = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("cvs")
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (data && data.data) {
        // Load CV data into context
        setTemplate(data.template as TemplateType);
        // Navigate to form with CV data
        navigate('/form');
      }
    } catch (error: any) {
      console.error('Error loading CV for edit:', error.message);
      toast.error(t("loadEditError"));
    }
  };

  const handleDeleteCV = async (id: string) => {
    if (!window.confirm(t("deleteConfirm"))) return;
    
    try {
      const { error } = await supabase
        .from("cvs")
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setSavedCVs(savedCVs.filter(cv => cv.id !== id));
      toast.success(t("deletedSuccessfully"));
    } catch (error: any) {
      console.error('Error deleting CV:', error.message);
      toast.error(t("deleteError"));
    }
  };

  const handleSaveCV = () => {
    if (cvState.data.personalInfo.fullName) {
      setCVName(cvState.data.personalInfo.fullName + " - CV");
      setSaveDialogOpen(true);
    } else {
      // If no name is set, show save dialog with empty field
      setCVName("");
      setSaveDialogOpen(true);
    }
  };

  const submitSaveCV = async () => {
    if (!cvName.trim()) {
      toast.error(t("enterCVName"));
      return;
    }
    
    if (!user) {
      toast.error(t("loginToSave"));
      return;
    }
    
    setSavingCV(true);
    
    try {
      // Convert CVData to a plain object to ensure it's compatible with JSON
      const cvDataForStorage = JSON.parse(JSON.stringify(cvState.data));

      const { data, error } = await supabase
        .from("cvs")
        .insert({
          name: cvName,
          template: cvState.selectedTemplate,
          data: cvDataForStorage,
          user_id: user.id
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Add new CV to the list
      if (data) {
        const newCV = {
          id: data.id,
          name: data.name,
          template: data.template as TemplateType,
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        
        setSavedCVs([newCV, ...savedCVs]);
      }
      
      toast.success(t("savedSuccessfully"));
      setSaveDialogOpen(false);
    } catch (error: any) {
      console.error('Error saving CV:', error.message);
      toast.error(t("saveError"));
    } finally {
      setSavingCV(false);
    }
  };

  return (
    <div className="container py-8 mx-auto max-w-4xl">
      <CVsHeader 
        onSaveCurrent={handleSaveCV}
        onCreateNew={handleCreateCV}
        hasReachedLimit={savedCVs.length >= 2}
      />

      {savedCVs.length >= 2 && <CVLimitWarning />}

      {loading ? (
        <CVsLoading />
      ) : savedCVs.length === 0 ? (
        <EmptyCVState onCreateNew={handleCreateCV} />
      ) : (
        <CVsList
          savedCVs={savedCVs}
          onViewCV={handleViewCV}
          onEditCV={handleEditCV}
          onDeleteCV={handleDeleteCV}
        />
      )}

      <SaveCVDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        cvName={cvName}
        onCVNameChange={setCVName}
        onSave={submitSaveCV}
        isSaving={savingCV}
      />
    </div>
  );
};

export default MyCVsPage;
