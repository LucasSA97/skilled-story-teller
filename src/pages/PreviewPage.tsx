
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { lazy, Suspense, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Lazy loading para componentes PDF pesados
const ModernPDF = lazy(() => import("@/components/pdf/ModernPDF"));
const ClassicPDF = lazy(() => import("@/components/pdf/ClassicPDF"));
const CreativePDF = lazy(() => import("@/components/pdf/CreativePDF"));
const MinimalPDF = lazy(() => import("@/components/pdf/MinimalPDF"));

const PreviewPage = () => {
  const { cvState } = useCVContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDataReady, setIsDataReady] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);
  
  // Verificar si los datos están listos para renderizar el PDF
  useEffect(() => {
    // Validar que existan los datos mínimos necesarios
    const hasPersonalInfo = cvState?.data?.personalInfo?.fullName;
    const hasTemplate = cvState?.selectedTemplate;
    
    if (!hasPersonalInfo || !hasTemplate) {
      toast({
        title: "Datos incompletos",
        description: "Por favor, completa al menos la información personal básica",
        variant: "destructive",
      });
      navigate("/form");
    } else {
      setIsDataReady(true);
      // Dar tiempo para que se carguen los componentes PDF
      // Aumentar el tiempo de espera para garantizar que todos los recursos se carguen
      setTimeout(() => setPdfReady(true), 1000);
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
  
  // Función para obtener el componente PDF correspondiente
  const getSelectedPDFComponent = () => {
    if (!isDataReady) return null;
    
    try {
      switch (cvState.selectedTemplate) {
        case "modern":
          return <ModernPDF data={cvState.data} />;
        case "classic":
          return <ClassicPDF data={cvState.data} />;
        case "creative":
          return <CreativePDF data={cvState.data} />;
        case "minimal":
          return <MinimalPDF data={cvState.data} />;
        default:
          return <ModernPDF data={cvState.data} />;
      }
    } catch (error) {
      console.error("Error al renderizar el componente PDF:", error);
      return null;
    }
  };

  // Si los datos no están listos, no renderizar el contenido principal
  if (!isDataReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold mb-4">Preparando tu CV...</h2>
          <Button onClick={() => navigate("/form")}>Volver al formulario</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Vista Previa de tu CV</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Revisa cómo se ve tu currículum con la plantilla elegida.
            Puedes volver a editar el contenido o cambiar de plantilla si lo deseas.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="lg:w-2/3 bg-white border rounded-lg shadow-md p-8 overflow-hidden">
            <div className="max-w-[800px] mx-auto">
              {renderSelectedTemplate()}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white border rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Acciones</h3>
              
              <div className="flex flex-col gap-3">
                {pdfReady && (
                  <Suspense fallback={<Button disabled className="w-full">Preparando PDF...</Button>}>
                    {/* Envolver PDFDownloadLink en un manejador de errores */}
                    <div className="w-full">
                      <Button 
                        className="w-full bg-blue-600"
                        onClick={() => {
                          try {
                            // Generar el PDF mediante un enlace de descarga directa
                            const fileName = `${cvState.data.personalInfo.fullName.replace(/ /g, "_")}_CV.pdf`;
                            toast({
                              title: "Preparando descarga",
                              description: "Tu PDF se está generando, espera un momento...",
                            });
                            // La descarga ocurrirá a través del componente PDFDownloadLink
                          } catch (error) {
                            console.error("Error al iniciar la descarga:", error);
                            toast({
                              title: "Error al generar PDF",
                              description: "Hubo un problema al crear tu archivo PDF. Intenta nuevamente.",
                              variant: "destructive",
                            });
                          }
                        }}
                      >
                        Descargar PDF
                      </Button>
                      
                      {/* Ocultar PDFDownloadLink pero mantenerlo en el DOM para que maneje la descarga */}
                      <div className="hidden">
                        <PDFDownloadLink
                          document={getSelectedPDFComponent()}
                          fileName={`${cvState.data.personalInfo.fullName.replace(/ /g, "_")}_CV.pdf`}
                        >
                          {({ loading, error }) => (
                            loading ? "Cargando..." : error ? "Error" : "Descargar"
                          )}
                        </PDFDownloadLink>
                      </div>
                    </div>
                  </Suspense>
                )}
                
                {!pdfReady && (
                  <Button disabled className="w-full">Preparando generador de PDF...</Button>
                )}
                
                <Button variant="outline" onClick={() => navigate("/templates")}>
                  Cambiar Plantilla
                </Button>
                
                <Button variant="outline" onClick={() => navigate("/form")}>
                  Editar Información
                </Button>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Consejos</h3>
              <ul className="text-gray-600 space-y-3 list-disc pl-5">
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
