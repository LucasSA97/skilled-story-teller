
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CircleUserRound, FileText, Download, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const LandingPage = () => {
  const { t, language } = useLanguage();

  const translations = {
    en: {
      hero: {
        title: "Your Professional Resume in Minutes",
        subtitle: "Create a resume that stands out from the crowd. Professional tools, modern templates, and an intuitive experience to boost your career.",
      },
      cta: {
        create: "Create my Resume",
        templates: "View Templates",
      },
      features: {
        customization: {
          title: "Total Customization",
          description: "Adapt each section of your resume to your professional profile with our intuitive tools.",
        },
        templates: {
          title: "Professional Templates",
          description: "Choose from multiple modern and professional designs that will make your resume stand out.",
        },
        export: {
          title: "Instant Export",
          description: "Download your resume in PDF, ready to send to employers in seconds.",
        },
      }
    },
    es: {
      hero: {
        title: "Tu CV Profesional en Minutos",
        subtitle: "Crea un currículum que destaque entre la multitud. Herramientas profesionales, plantillas modernas y una experiencia intuitiva para impulsar tu carrera.",
      },
      cta: {
        create: "Crear mi CV",
        templates: "Ver Plantillas",
      },
      features: {
        customization: {
          title: "Personalización Total",
          description: "Adapta cada sección de tu CV a tu perfil profesional con nuestras herramientas intuitivas.",
        },
        templates: {
          title: "Plantillas Profesionales",
          description: "Elige entre múltiples diseños modernos y profesionales que harán destacar tu CV.",
        },
        export: {
          title: "Exportación Instantánea",
          description: "Descarga tu CV en PDF, listo para enviar a empleadores en segundos.",
        }
      }
    }
  };

  const content = translations[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-background dark:from-primary/5 dark:to-background -z-10" />
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent dark:from-white dark:to-white/80">
              {content.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/form">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <FileText className="mr-2 h-5 w-5" />
                  {content.cta.create}
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {content.cta.templates}
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
                <CircleUserRound className="h-6 w-6 text-primary dark:white" />
              </div>
              <h3 className="text-lg font-semibold">{content.features.customization.title}</h3>
              <p className="text-muted-foreground">
                {content.features.customization.description}
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg -z-10 group-hover:opacity-75 transition-opacity" />
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary dark:white" />
              </div>
              <h3 className="text-lg font-semibold">{content.features.templates.title}</h3>
              <p className="text-muted-foreground">
                {content.features.templates.description}
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg -z-10 group-hover:opacity-75 transition-opacity" />
            <div className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Download className="h-6 w-6 text-primary dark:white" />
              </div>
              <h3 className="text-lg font-semibold">{content.features.export.title}</h3>
              <p className="text-muted-foreground">
                {content.features.export.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
