
import { useContext } from 'react';
import { CVContext } from '@/context/CVContext';

export const useNavigation = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('useNavigation must be used within CVProvider');

  const { cvState, nextStep, prevStep, goToStep } = context;
  return {
    currentStep: cvState.currentStep,
    nextStep,
    prevStep,
    goToStep,
  };
};
