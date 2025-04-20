
import { useContext } from 'react';
import { CVContext } from '@/context/CVContext';
import { PersonalInfo } from '@/types';

export const usePersonalInfo = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('usePersonalInfo must be used within CVProvider');

  const { cvState, updatePersonalInfo } = context;
  return { personalInfo: cvState.data.personalInfo, updatePersonalInfo };
};
