
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">
          Crea tu Currículum Profesional
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Diseña un currículum impresionante en minutos. Elige entre distintas plantillas 
          y personaliza cada sección para destacar tus habilidades profesionales.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fácil de Usar</h3>
            <p className="text-gray-600 text-center">Formulario intuitivo paso a paso que te guía en todo el proceso.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Exportación PDF</h3>
            <p className="text-gray-600 text-center">Descarga tu CV en formato PDF listo para enviar a empresas.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Múltiples Plantillas</h3>
            <p className="text-gray-600 text-center">Varias opciones de diseño profesional para elegir.</p>
          </div>
        </div>
        
        <Link to="/form">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md text-lg transition-all duration-200 shadow-md hover:shadow-lg">
            Crear mi CV
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
