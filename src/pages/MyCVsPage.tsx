
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCVContext } from "@/context/CVContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Edit, Eye, Trash2, Save } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { TemplateType, CVData } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          template: cv.template as TemplateType, // Cast the string to TemplateType
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{t('myCVsTitle')}</h1>
          <p className="text-muted-foreground">{t('manageCVs')}</p>
        </div>
        <div className="space-x-2">
          <Button 
            onClick={handleSaveCV}
            className="flex items-center gap-2"
          >
            <Save size={18} /> {t('saveCurrentCV')}
          </Button>
          <Button 
            onClick={handleCreateCV}
            className="flex items-center gap-2"
            disabled={savedCVs.length >= 2}
          >
            <Plus size={18} /> {t('createNewCV')}
          </Button>
        </div>
      </div>

      {savedCVs.length >= 2 && (
        <Card className="mb-6 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-4">
            <p className="text-yellow-800">
              {t('limitReached')}
            </p>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : savedCVs.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('noCVs')}</h3>
            <p className="text-muted-foreground mb-4">{t('createFirstCV')}</p>
            <Button onClick={handleCreateCV}>
              <Plus size={16} className="mr-2" /> {t('createMyFirstCV')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t('savedCVs')}</CardTitle>
            <CardDescription>
              {t('youHave')} {savedCVs.length} {savedCVs.length === 1 ? t('cv') : t('cvs')} {t('saved')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('template')}</TableHead>
                  <TableHead>{t('lastUpdate')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savedCVs.map((cv) => (
                  <TableRow key={cv.id}>
                    <TableCell className="font-medium">{cv.name}</TableCell>
                    <TableCell className="capitalize">{cv.template}</TableCell>
                    <TableCell>{new Date(cv.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleViewCV(cv.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleEditCV(cv.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteCV(cv.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Save CV Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('saveCVTitle')}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="cv-name">{t('cvName')}</Label>
            <Input 
              id="cv-name" 
              value={cvName} 
              onChange={(e) => setCVName(e.target.value)} 
              placeholder={t('cvNamePlaceholder')} 
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={submitSaveCV} disabled={savingCV}>
              {savingCV ? t('saving') : t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCVsPage;
