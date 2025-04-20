
import { useContext } from 'react';
import { CVContext } from '@/context/CVContext';

export const useLanguages = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('useLanguages must be used within CVProvider');

  const { cvState, addLanguage, updateLanguage, removeLanguage } = context;
  return {
    languages: cvState.data.languages,
    addLanguage,
    updateLanguage,
    removeLanguage,
  };
};
