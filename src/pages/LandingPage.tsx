
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CircleUserRound, FileText, Download, Sparkles } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-background dark:from-primary/5 dark:to-background -z-10" />
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent dark:from-white dark:to-white/80">
              Tu CV Profesional en Minutos
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Crea un currículum que destaque entre la multitud. Herramientas profesionales, 
              plantillas modernas y una experiencia intuitiva para impulsar tu carrera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/form">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <FileText className="mr-2 h-5 w-5" />
                  Crear mi CV
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Ver Plantillas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg -z-10 group-hover:opacity-75 transition-opacity" />
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <CircleUserRound className="h-6 w-6 text-primary dark:text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Personalización Total</h3>
              <p className="text-muted-foreground">
                Adapta cada sección de tu CV a tu perfil profesional con nuestras herramientas intuitivas.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg -z-10 group-hover:opacity-75 transition-opacity" />
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary dark:text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Plantillas Profesionales</h3>
              <p className="text-muted-foreground">
                Elige entre múltiples diseños modernos y profesionales que harán destacar tu CV.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg -z-10 group-hover:opacity-75 transition-opacity" />
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Download className="h-6 w-6 text-primary dark:text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Exportación Instantánea</h3>
              <p className="text-muted-foreground">
                Descarga tu CV en PDF, listo para enviar a empleadores en segundos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
