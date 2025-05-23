
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import { lazy, Suspense, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  exportToPDF 
} from "@/services/exportService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileEdit, Palette } from "lucide-react";

// Lazy loading para componentes PDF pesados - mantenemos por si se arregla en el futuro
const ModernPDF = lazy(() => import("@/components/pdf/ModernPDF"));
const ClassicPDF = lazy(() => import("@/components/pdf/ClassicPDF"));
const CreativePDF = lazy(() => import("@/components/pdf/CreativePDF"));
const MinimalPDF = lazy(() => import("@/components/pdf/MinimalPDF"));

const PreviewPage = () => {
  const { cvState } = useCVContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDataReady, setIsDataReady] = useState(false);
  
  // Verificar si los datos están listos para renderizar
  useEffect(() => {
    // Validar que existan los datos mínimos necesarios
    const hasPersonalInfo = cvState?.data?.personalInfo?.fullName;
    const hasTemplate = cvState?.selectedTemplate;
    
    if (!hasPersonalInfo || !hasTemplate) {
      toast({
        title: "Información incompleta",
        description: "Para ver tu CV, completa al menos tus datos personales básicos",
        variant: "default",
      });
      navigate("/form");
    } else {
      setIsDataReady(true);
    }
  }, [cvState, navigate, toast]);
  
  // Selector de plantilla basado en la selección del usuario
  const renderSelectedTemplate = () => {
    if (!isDataReady) return <div className="p-8 text-center">Cargando vista previa...</div>;
    
    switch (cvState.selectedTemplate) {
      case "modern":
        return <ModernTemplate data={cvState.data} />;
      case "classic":
        return <ClassicTemplate data={cvState.data} />;
      case "creative":
        return <CreativeTemplate data={cvState.data} />;
      case "minimal":
        return <MinimalTemplate data={cvState.data} />;
      default:
        return <ModernTemplate data={cvState.data} />;
    }
  };
  
  // Función para manejar la exportación del CV
  const handleExport = async (format: 'pdf') => {
    if (!isDataReady) {
      toast({
        title: "No se puede exportar",
        description: "Asegúrate de que todos los datos estén cargados correctamente",
        variant: "destructive",
      });
      return;
    }
    
    const fileName = `${cvState.data.personalInfo.fullName.replace(/ /g, "_")}_CV`;
    
    try {
      let success = false;
      
      switch (format) {
        case 'pdf':
          success = await exportToPDF({ 
            data: cvState.data, 
            filename: `${fileName}.pdf`,
            template: cvState.selectedTemplate
          });
          break;
      }
      
      if (success) {
        toast({
          title: "Descarga iniciada",
          description: "Tu CV ha sido exportado correctamente",
        });
      } else {
        throw new Error("Error durante la exportación");
      }
    } catch (error) {
      console.error("Error de exportación:", error);
      toast({
        title: "Error de exportación",
        description: "No se pudo generar el archivo. Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  // Si los datos no están listos, mostrar una página de onboarding más amigable
  if (!isDataReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 transition-colors duration-300">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg border p-8 max-w-md mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-foreground">¡Casi estamos listos!</h2>
            <p className="text-muted-foreground mb-8">
              Para crear tu CV necesitamos algunos datos básicos sobre ti. Completa el formulario 
              para ver tu CV con la plantilla seleccionada.
            </p>
            <div className="flex flex-col gap-4">
              <Button onClick={() => navigate("/form")} className="w-full">
                <FileEdit className="mr-2 h-4 w-4" />
                Completar mi información
              </Button>
              <Button variant="outline" onClick={() => navigate("/templates")} className="w-full">
                <Palette className="mr-2 h-4 w-4" />
                Explorar plantillas
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Vista Previa de tu CV</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Revisa cómo se ve tu currículum con la plantilla elegida.
            Puedes volver a editar el contenido o cambiar de plantilla si lo deseas.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="lg:w-2/3 bg-card text-card-foreground border rounded-lg shadow-md p-8 overflow-hidden">
            <div className="max-w-[800px] mx-auto">
              {renderSelectedTemplate()}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-card text-card-foreground border rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Acciones</h3>
              
              <div className="flex flex-col gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" /> Exportar CV
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport('pdf')}>
                      Exportar como PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" onClick={() => navigate("/templates")}>
                  <Palette className="mr-2 h-4 w-4" />
                  Cambiar Plantilla
                </Button>
                
                <Button variant="outline" onClick={() => navigate("/form")}>
                  <FileEdit className="mr-2 h-4 w-4" />
                  Editar Información
                </Button>
              </div>
            </div>
            
            <div className="bg-card text-card-foreground border rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Consejos</h3>
              <ul className="text-muted-foreground space-y-3 list-disc pl-5">
                <li>Revisa la ortografía y gramática antes de descargar.</li>
                <li>Asegúrate de que la información más relevante destaque.</li>
                <li>Ajusta las secciones según el tipo de trabajo que buscas.</li>
                <li>Usa palabras clave relevantes para tu sector profesional.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
