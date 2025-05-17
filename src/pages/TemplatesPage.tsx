
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { TemplateType } from "@/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const TemplatesPage = () => {
  const { cvState, setTemplate } = useCVContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const templates: { id: TemplateType; name: string; description: string, image?: string, badge?: string }[] = [
    {
      id: "modern",
      name: "Moderno",
      description: "Diseño limpio y profesional con elementos modernos y uso de color.",
      image: '/templates/ModernTemplate.png',
      badge: "Best Seller"
    },
    {
      id: "classic",
      name: "Clásico",
      description: "Diseño tradicional y elegante, ideal para sectores conservadores.",
      image: '/templates/PlantillaClasic.png'
    },
    {
      id: "creative",
      name: "Creativo",
      description: "Diseño audaz y diferente para destacar tu personalidad.",
      image: '/templates/PlantillaModerna.png',
      badge: "20% off"
    },
    {
      id: "minimal",
      name: "Minimalista",
      description: "Diseño simple y directo centrado en el contenido y legibilidad.",
      image: '/templates/MinimalistTemplate.png',
      badge: "New"
    },
  ];

  const handleSelectTemplate = (templateId: TemplateType) => {
    setTemplate(templateId);
    
    // Check if user has filled at least the personal info section
    const hasPersonalInfo = cvState?.data?.personalInfo?.fullName;
    
    if (!hasPersonalInfo) {
      // Instead of navigating with an error, show a friendly toast message
      toast({
        title: "Plantilla seleccionada",
        description: "Completa la información básica para ver tu CV con esta plantilla",
      });
      navigate("/form");
    } else {
      navigate("/preview");
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Elige una Plantilla</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Selecciona el diseño que mejor represente tu estilo profesional. Todas las plantillas 
            están optimizadas para impresión y lectura digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={`relative overflow-hidden rounded-3xl transition-all hover:shadow-lg ${
                cvState.selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              {template.badge && (
                <div className="absolute top-3 right-3 bg-black/25 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                  {template.badge}
                </div>
              )}
              
              <div 
                className="h-80 bg-gradient-to-b from-amber-300 to-amber-500 relative"
                style={{
                  backgroundImage: template.image ? `url(${template.image})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!template.image && (
                  <Skeleton className="h-full w-full" />
                )}
              </div>
              
              <div className="p-6 bg-card">
                <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
                <p className="text-muted-foreground mb-4">{template.description}</p>
                
                <Button 
                  className="w-full rounded-full py-6"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  {cvState.selectedTemplate === template.id 
                    ? 'Plantilla Seleccionada' 
                    : 'Seleccionar Plantilla'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/form")}>
            Volver al Formulario
          </Button>
          
          <Button 
            onClick={() => navigate("/preview")}
            disabled={!cvState.selectedTemplate}
          >
            Continuar a Vista Previa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
