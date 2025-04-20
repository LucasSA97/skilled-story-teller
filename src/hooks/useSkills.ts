
import { useContext } from 'react';
import { CVContext } from '@/context/CVContext';

export const useSkills = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('useSkills must be used within CVProvider');

  const { cvState, addSkill, removeSkill } = context;
  return { skills: cvState.data.skills, addSkill, removeSkill };
};
