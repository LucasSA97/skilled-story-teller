import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ModernPDF from '@/components/pdf/ModernPDF';
import ClassicPDF from '@/components/pdf/ClassicPDF';
import CreativePDF from '@/components/pdf/CreativePDF';
import MinimalPDF from '@/components/pdf/MinimalPDF';
import { Document, Page } from '@react-pdf/renderer';
import { CVData } from '@/types';

export const exportToPDF = async ({
  data,
  filename
}: {
  data: CVData;
  filename: string;
}) => {
  try {
    let PdfComponent;

    switch (data.selectedTemplate) {
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

    // Definimos el documento PDF como un componente de React-PDF
    const pdfDoc = (
      <Document>
        <Page size="A4">
          <PdfComponent data={data} />
        </Page>
      </Document>
    );

    // Usamos el método correcto para navegador
    const blob = await pdf(pdfDoc).toBlob();

    // Usamos file-saver para descargarlo
    saveAs(blob, filename);

    return true;
  } catch (error) {
    console.error("PDF Export Error:", error);
    return false;
  }
};
