
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ModernPDF from '@/components/pdf/ModernPDF';
import ClassicPDF from '@/components/pdf/ClassicPDF';
import CreativePDF from '@/components/pdf/CreativePDF';
import MinimalPDF from '@/components/pdf/MinimalPDF';
import { Document } from '@react-pdf/renderer';
import { CVData, TemplateType } from '@/types';

export const exportToPDF = async ({
  data,
  filename,
  template
}: {
  data: CVData;
  filename: string;
  template: TemplateType;
}) => {
  try {
    let PdfComponent;

    switch (template) {
      case 'modern':
        PdfComponent = ModernPDF;
        break;
      case 'classic':
        PdfComponent = ClassicPDF;
        break;
      case 'creative':
        PdfComponent = CreativePDF;
        break;
      case 'minimal':
        PdfComponent = MinimalPDF;
        break;
      default:
        PdfComponent = ModernPDF;
    }

    // Create the PDF document
    const blob = await pdf(<PdfComponent data={data} />).toBlob();
    
    // Download the file
    saveAs(blob, filename);
    
    return true;
  } catch (error) {
    console.error("PDF Export Error:", error);
    return false;
  }
};
