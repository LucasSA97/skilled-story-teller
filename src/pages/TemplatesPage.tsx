
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { TemplateType } from "@/types";
import { useNavigate } from "react-router-dom";

const TemplatesPage = () => {
  const { cvState, setTemplate } = useCVContext();
  const navigate = useNavigate();
  
  const templates: { id: TemplateType; name: string; description: string, image?: string }[] = [
    {
      id: "modern",
      name: "Moderno",
      description: "Diseño limpio y profesional con elementos modernos y uso de color.",
      image: '/public/templates/ModernTemplate.png'
    },
    {
      id: "classic",
      name: "Clásico",
      description: "Diseño tradicional y elegante, ideal para sectores conservadores.",
      image: '/public/templates/PlantillaClasic.png'
    },
    {
      id: "creative",
      name: "Creativo",
      description: "Diseño audaz y diferente para destacar tu personalidad.",
      image: '/public/templates/PlantillaModerna.png'
    },
    {
      id: "minimal",
      name: "Minimalista",
      description: "Diseño simple y directo centrado en el contenido y legibilidad.",
      image: '/public/templates/MinimalistTemplate.png'
    },
  ];

  const handleSelectTemplate = (templateId: TemplateType) => {
    setTemplate(templateId);
    navigate("/preview");
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
              className={`bg-card text-card-foreground border rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg ${
                cvState.selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="h-64 bg-muted border-b relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <img 
                    src={template.image}
                    alt={`Vista previa de la plantilla ${template.name}`}
                    className="object-cover h-full"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-muted-foreground mb-4">{template.description}</p>
                <Button 
                  className={cvState.selectedTemplate === template.id ? 'bg-primary' : ''}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  {cvState.selectedTemplate === template.id ? 'Plantilla Seleccionada' : 'Seleccionar Plantilla'}
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
