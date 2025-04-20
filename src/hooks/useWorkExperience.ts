
import { useContext } from 'react';
import { CVContext } from '@/context/CVContext';

export const useWorkExperience = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('useWorkExperience must be used within CVProvider');

  const { cvState, addWorkExperience, updateWorkExperience, removeWorkExperience } = context;
  return {
    workExperience: cvState.data.workExperience,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
  };
};
