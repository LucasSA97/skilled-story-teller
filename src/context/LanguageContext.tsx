import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type Language = 'es' | 'en';

type LanguageContextType = {
  language: Language;
  switchLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Header
    'back': 'Back',
    'cvBuilder': 'CV Builder',
    'myCVs': 'My CVs',
    'changeTemplate': 'Change Template',
    'editCV': 'Edit CV',
    'signOut': 'Sign Out',
    'signIn': 'Sign In',
    
    // MyCVs Page
    'myCVsTitle': 'My CVs',
    'manageCVs': 'Manage your created resumes',
    'saveCurrentCV': 'Save Current CV',
    'createNewCV': 'Create New CV',
    'limitReached': 'You have reached the limit of 2 CVs. To create a new one, delete an existing one.',
    'loading': 'Loading...',
    'noCVs': 'You have no saved CVs',
    'createFirstCV': 'Create your first CV to get started',
    'createMyFirstCV': 'Create my first CV',
    'savedCVs': 'Saved CVs',
    'youHave': 'You have',
    'cv': 'CV',
    'cvs': 'CVs',
    'saved': 'saved',
    'name': 'Name',
    'template': 'Template',
    'lastUpdate': 'Last update',
    'actions': 'Actions',
    'deleteConfirm': 'Are you sure you want to delete this CV?',
    'deletedSuccessfully': 'CV deleted successfully',
    'deleteError': 'Could not delete the CV',
    'saveCVTitle': 'Save Resume',
    'cvName': 'CV Name',
    'cvNamePlaceholder': 'e.g.: Professional CV',
    'cancel': 'Cancel',
    'save': 'Save',
    'saving': 'Saving...',
    'enterCVName': 'Please enter a name for the CV',
    'loginToSave': 'You must be logged in to save a CV',
    'savedSuccessfully': 'CV saved successfully',
    'saveError': 'Could not save the CV',
    
    // Other sections as needed
  },
  es: {
    // Header
    'back': 'Volver',
    'cvBuilder': 'CV Builder',
    'myCVs': 'Mis CVs',
    'changeTemplate': 'Cambiar Plantilla',
    'editCV': 'Editar CV',
    'signOut': 'Salir',
    'signIn': 'Iniciar Sesión',
    
    // MyCVs Page
    'myCVsTitle': 'Mis CVs',
    'manageCVs': 'Gestiona tus currículums creados',
    'saveCurrentCV': 'Guardar CV actual',
    'createNewCV': 'Crear CV nuevo',
    'limitReached': 'Has alcanzado el límite de 2 CVs. Para crear uno nuevo, elimina alguno existente.',
    'loading': 'Cargando...',
    'noCVs': 'No tienes CVs guardados',
    'createFirstCV': 'Crea tu primer CV para comenzar',
    'createMyFirstCV': 'Crear mi primer CV',
    'savedCVs': 'CVs guardados',
    'youHave': 'Tienes',
    'cv': 'CV',
    'cvs': 'CVs',
    'saved': 'guardados',
    'name': 'Nombre',
    'template': 'Plantilla',
    'lastUpdate': 'Última actualización',
    'actions': 'Acciones',
    'deleteConfirm': '¿Estás seguro de que deseas eliminar este CV?',
    'deletedSuccessfully': 'CV eliminado correctamente',
    'deleteError': 'No se pudo eliminar el CV',
    'saveCVTitle': 'Guardar Currículum',
    'cvName': 'Nombre del CV',
    'cvNamePlaceholder': 'Ej: CV Profesional',
    'cancel': 'Cancelar',
    'save': 'Guardar',
    'saving': 'Guardando...',
    'enterCVName': 'Por favor, introduce un nombre para el CV',
    'loginToSave': 'Debes iniciar sesión para guardar un CV',
    'savedSuccessfully': 'CV guardado correctamente',
    'saveError': 'No se pudo guardar el CV',
    
    // Other sections as needed
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [storedLanguage, setStoredLanguage] = useLocalStorage<Language>('language', 'es');
  const [language, setLanguage] = useState<Language>(storedLanguage);

  useEffect(() => {
    setStoredLanguage(language);
  }, [language, setStoredLanguage]);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
