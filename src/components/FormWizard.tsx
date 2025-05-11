
import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import ContactInfoForm from "@/components/forms/ContactInfoForm";
import SummaryForm from "@/components/forms/SummaryForm";
import WorkExperienceForm from "@/components/forms/WorkExperienceForm";
import EducationForm from "@/components/forms/EducationForm";
import SkillsForm from "@/components/forms/SkillsForm";
import LanguagesForm from "@/components/forms/LanguagesForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import RecommendationPanel from "@/components/RecommendationPanel";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const steps = [
  { title: "Datos Personales", component: PersonalInfoForm },
  { title: "Contacto", component: ContactInfoForm },
  { title: "Perfil Profesional", component: SummaryForm },
  { title: "Experiencia Laboral", component: WorkExperienceForm },
  { title: "Educación", component: EducationForm },
  { title: "Habilidades", component: SkillsForm },
  { title: "Idiomas", component: LanguagesForm },
];

const FormWizard = () => {
  const { cvState, nextStep, prevStep, goToStep } = useCVContext();
  const { currentStep } = cvState;
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      // Si ya tiene plantilla seleccionada, ir a preview, sino a templates
      if (cvState.selectedTemplate) {
        navigate("/preview");
      } else {
        navigate("/templates");
      }
    } else {
      nextStep();
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    }
  };

  const handleSavePrompt = () => {
    if (!isAuthenticated) {
      toast({
        title: "Guarda tu progreso",
        description: "Crea una cuenta para guardar y acceder a tus CVs desde cualquier dispositivo",
        action: (
          <Button 
            variant="outline" 
            onClick={() => navigate("/auth")}
            className="border-primary text-primary hover:bg-primary/5"
          >
            Crear cuenta
          </Button>
        ),
      });
    } else {
      // Aquí iría la lógica para guardar el CV si el usuario está autenticado
      toast({
        title: "CV guardado",
        description: "Tu CV ha sido guardado correctamente",
      });
    }
  };
  
  const CurrentStepComponent = steps[currentStep].component;
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Crea tu Currículum</h1>
          <span className="text-sm text-muted-foreground">
            Paso {currentStep + 1} de {steps.length}
          </span>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 flex rounded bg-secondary">
            <div
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-300"
            ></div>
          </div>
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`flex flex-col items-center transition-colors duration-200 ${
                  index <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm mb-1
                  ${index < currentStep ? "bg-primary text-primary-foreground" : 
                    index === currentStep ? "border-2 border-primary text-primary" : 
                    "border-2 border-muted text-muted-foreground"}`}
                >
                  {index + 1}
                </span>
                <span className="text-xs hidden sm:block">{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md border border-border mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSavePrompt}
            className="text-xs"
          >
            <Save className="h-3.5 w-3.5 mr-1" />
            {isAuthenticated ? "Guardar cambios" : "Guardar CV"}
          </Button>
        </div>
        <CurrentStepComponent />
      </div>

      <RecommendationPanel step={currentStep} />

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Anterior
        </Button>
        
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Continuar a Plantillas" : "Siguiente"}
        </Button>
      </div>

      {/* Info banner about templates */}
      {currentStep > 0 && cvState.selectedTemplate && (
        <div className="mt-8 p-4 bg-primary/10 rounded-lg text-sm text-center">
          Ya has seleccionado la plantilla <span className="font-medium">{
            cvState.selectedTemplate === "modern" ? "Moderna" :
            cvState.selectedTemplate === "classic" ? "Clásica" :
            cvState.selectedTemplate === "creative" ? "Creativa" :
            "Minimalista"
          }</span>. 
          Podrás <span className="font-medium">cambiarla en cualquier momento</span> después de completar el formulario.
        </div>
      )}
    </div>
  );
};

export default FormWizard;
