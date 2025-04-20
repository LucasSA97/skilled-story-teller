
import { useContext } from 'react';
import { CVContext } from '@/context/CVContext';

export const useEducation = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('useEducation must be used within CVProvider');

  const { cvState, addEducation, updateEducation, removeEducation } = context;
  return {
    education: cvState.data.education,
    addEducation,
    updateEducation,
    removeEducation,
  };
};
