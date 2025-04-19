
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { TemplateType } from "@/types";
import { useNavigate } from "react-router-dom";

const TemplatesPage = () => {
  const { cvState, setTemplate } = useCVContext();
  const navigate = useNavigate();
  
  const templates: { id: TemplateType; name: string; description: string }[] = [
    {
      id: "modern",
      name: "Moderno",
      description: "Diseño limpio y profesional con elementos modernos y uso de color.",
    },
    {
      id: "classic",
      name: "Clásico",
      description: "Diseño tradicional y elegante, ideal para sectores conservadores.",
    },
    {
      id: "creative",
      name: "Creativo",
      description: "Diseño audaz y diferente para destacar tu personalidad.",
    },
    {
      id: "minimal",
      name: "Minimalista",
      description: "Diseño simple y directo centrado en el contenido y legibilidad.",
    },
  ];

  const handleSelectTemplate = (templateId: TemplateType) => {
    setTemplate(templateId);
    navigate("/preview");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Elige una Plantilla</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Selecciona el diseño que mejor represente tu estilo profesional. Todas las plantillas 
            están optimizadas para impresión y lectura digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={`bg-white border rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg ${
                cvState.selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="h-64 bg-gray-200 border-b relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  {/* Reemplazar con vista previa de la plantilla */}
                  Vista previa de la plantilla {template.name}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <Button 
                  className={cvState.selectedTemplate === template.id ? 'bg-blue-600' : 'bg-gray-800'}
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
