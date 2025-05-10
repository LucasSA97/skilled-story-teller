
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCVContext } from "@/context/CVContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Edit, Eye, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { TemplateType } from "@/types";

interface SavedCV {
  id: string;
  name: string;
  template: TemplateType;
  created_at: string;
  updated_at: string;
}

const MyCVsPage = () => {
  const { user } = useAuth();
  const { cvState } = useCVContext();
  const navigate = useNavigate();
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [loading, setLoading] = useState(true);

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
        setSavedCVs(data || []);
      } catch (error: any) {
        console.error('Error fetching CVs:', error.message);
        toast.error("No se pudieron cargar los CVs");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedCVs();
  }, [user]);

  const handleCreateCV = () => {
    navigate('/form');
  };

  const handleViewCV = (id: string) => {
    // In the future, this will load the CV and navigate to preview
    navigate('/preview');
  };

  const handleEditCV = (id: string) => {
    // In the future, this will load the CV and navigate to form
    navigate('/form');
  };

  const handleDeleteCV = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este CV?")) return;
    
    try {
      const { error } = await supabase
        .from("cvs")
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setSavedCVs(savedCVs.filter(cv => cv.id !== id));
      toast.success("CV eliminado correctamente");
    } catch (error: any) {
      console.error('Error deleting CV:', error.message);
      toast.error("No se pudo eliminar el CV");
    }
  };

  return (
    <div className="container py-8 mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mis CVs</h1>
          <p className="text-muted-foreground">Gestiona tus currículums creados</p>
        </div>
        <Button 
          onClick={handleCreateCV}
          className="flex items-center gap-2"
          disabled={savedCVs.length >= 2}
        >
          <Plus size={18} /> Crear CV
        </Button>
      </div>

      {savedCVs.length >= 2 && (
        <Card className="mb-6 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-4">
            <p className="text-yellow-800">
              Has alcanzado el límite de 2 CVs. Para crear uno nuevo, elimina alguno existente.
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
            <h3 className="text-lg font-medium mb-2">No tienes CVs guardados</h3>
            <p className="text-muted-foreground mb-4">Crea tu primer CV para comenzar</p>
            <Button onClick={handleCreateCV}>
              <Plus size={16} className="mr-2" /> Crear mi primer CV
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>CVs guardados</CardTitle>
            <CardDescription>
              Tienes {savedCVs.length} {savedCVs.length === 1 ? 'CV' : 'CVs'} guardados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Plantilla</TableHead>
                  <TableHead>Última actualización</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
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
    </div>
  );
};

export default MyCVsPage;
