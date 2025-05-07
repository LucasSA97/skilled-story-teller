
import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface Recommendation {
  title: string;
  description: string[];
}

interface RecommendationPanelProps {
  step: number;
}

const RecommendationPanel = ({ step }: RecommendationPanelProps) => {
  const recommendations: Record<number, Recommendation> = {
    0: {
      title: "Datos personales importantes",
      description: [
        "Usa un nombre completo profesional, evitando apodos.",
        "Considera si incluir o no tu fecha de nacimiento según el país y tipo de trabajo.",
        "Una foto profesional puede aumentar la visibilidad de tu CV, pero asegúrate que sea de buena calidad."
      ]
    },
    1: {
      title: "Contacto profesional",
      description: [
        "Utiliza un correo electrónico profesional, preferiblemente con tu nombre.",
        "Incluye prefijos internacionales en tu número de teléfono (+34, etc.).",
        "Los perfiles de LinkedIn y GitHub actualizados añaden valor profesional."
      ]
    },
    2: {
      title: "Perfil profesional efectivo",
      description: [
        "Personaliza tu perfil para cada puesto al que apliques.",
        "Mantén un tono profesional pero auténtico que refleje tu personalidad.",
        "Destaca logros específicos con números cuando sea posible.",
        "Limítalo a 3-5 frases para mantener la atención del reclutador."
      ]
    },
    3: {
      title: "Experiencia laboral destacada",
      description: [
        "Organiza tus experiencias en orden cronológico inverso (más reciente primero).",
        "Utiliza verbos de acción para describir tus responsabilidades y logros.",
        "Cuantifica tus logros cuando sea posible (ej: \"Aumenté ventas un 20%\").",
        "Adapta las descripciones al puesto que estás solicitando."
      ]
    },
    4: {
      title: "Formación académica relevante",
      description: [
        "Destaca solo la formación más relevante para el puesto.",
        "Incluye cursos y certificaciones recientes relacionados con el sector.",
        "Si eres recién graduado, detalla proyectos académicos relevantes.",
        "Para profesionales con experiencia, la formación puede ser más concisa."
      ]
    },
    5: {
      title: "Habilidades que destacan",
      description: [
        "Incluye una mezcla equilibrada de habilidades técnicas y blandas.",
        "Sé específico con las tecnologías y herramientas que dominas.",
        "Prioriza las habilidades más relevantes para el puesto.",
        "Evita habilidades genéricas como \"trabajo en equipo\" sin contexto."
      ]
    },
    6: {
      title: "Idiomas como ventaja competitiva",
      description: [
        "Sé honesto con tu nivel de idiomas, podrían evaluarte durante la entrevista.",
        "Especifica certificados oficiales si los tienes (TOEFL, Cambridge, DELF, etc.).",
        "Si el puesto requiere un idioma específico, colócalo entre los primeros.",
        "Considera incluir tu nivel de escritura y conversación por separado si difieren."
      ]
    },
  };

  const currentRecommendation = recommendations[step] || {
    title: "Recomendaciones generales",
    description: [
      "Mantén tu CV actualizado con tus logros y experiencias más recientes.",
      "Adapta tu CV para cada oferta de trabajo a la que apliques.",
      "Utiliza un diseño limpio y profesional que sea fácil de leer."
    ]
  };

  return (
    <Card className="p-4 bg-secondary/20 border-secondary/50 mt-6">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2 text-foreground">{currentRecommendation.title}</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
            {currentRecommendation.description.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationPanel;
