
import { useContext } from 'react';
import { CVContext } from '@/context/CVContext';
import { ContactInfo } from '@/types';

export const useContactInfo = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('useContactInfo must be used within CVProvider');

  const { cvState, updateContactInfo } = context;
  return { contactInfo: cvState.data.contactInfo, updateContactInfo };
};
