
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
  
  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      navigate("/templates");
    } else {
      nextStep();
    }
  };
  
  const CurrentStepComponent = steps[currentStep].component;
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Crea tu Currículum</h1>
          <span className="text-sm text-gray-500">
            Paso {currentStep + 1} de {steps.length}
          </span>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-200">
            <div
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
            ></div>
          </div>
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`flex flex-col items-center transition-colors duration-200 ${
                  index <= currentStep ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <span
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm mb-1
                  ${index < currentStep ? "bg-blue-500 text-white" : 
                    index === currentStep ? "border-2 border-blue-500 text-blue-500" : 
                    "border-2 border-gray-300 text-gray-400"}`}
                >
                  {index + 1}
                </span>
                <span className="text-xs hidden sm:block">{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h2>
        <CurrentStepComponent />
      </div>

      <div className="flex justify-between">
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
    </div>
  );
};

export default FormWizard;
