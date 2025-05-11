
import { useState, useEffect } from "react";
import FormWizard from "@/components/FormWizard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { X } from "lucide-react";

const FormPage = () => {
  const { isAuthenticated } = useAuth();
  const [showWelcomeBox, setShowWelcomeBox] = useState(true);
  
  // Check localStorage to see if the user has dismissed the welcome box before
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("cv-welcome-seen");
    if (hasSeenWelcome) {
      setShowWelcomeBox(false);
    }
  }, []);
  
  const handleDismissWelcome = () => {
    localStorage.setItem("cv-welcome-seen", "true");
    setShowWelcomeBox(false);
  };

  return (
    <div className="min-h-screen bg-background py-12 pb-16 transition-colors duration-300">
      {showWelcomeBox && !isAuthenticated && (
        <div className="max-w-3xl mx-auto mb-6 bg-card border rounded-lg shadow-md p-6 relative">
          <button 
            onClick={handleDismissWelcome}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
          
          <h2 className="text-xl font-semibold mb-3">¡Bienvenido a nuestro Creador de CV!</h2>
          <p className="text-muted-foreground mb-4">
            Estás a punto de crear un currículum profesional que te ayudará a destacar entre la competencia.
            Puedes usar esta herramienta <strong>sin necesidad de registrarte</strong>, pero crear una cuenta gratuita te permite:
          </p>
          
          <ul className="list-disc pl-5 space-y-1 mb-4 text-muted-foreground">
            <li>Guardar tu progreso automáticamente</li>
            <li>Crear y almacenar múltiples versiones de tu CV</li>
            <li>Acceder a tus currículums desde cualquier dispositivo</li>
            <li>Editar y actualizar tu información en cualquier momento</li>
          </ul>
          
          <div className="text-center">
            <Button variant="outline" onClick={() => window.location.href = "/auth"}>
              Crear cuenta gratuita
            </Button>
          </div>
        </div>
      )}
      
      <FormWizard />
    </div>
  );
};

export default FormPage;
