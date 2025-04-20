
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ModernPDF from '@/components/pdf/ModernPDF';
import ClassicPDF from '@/components/pdf/ClassicPDF';
import CreativePDF from '@/components/pdf/CreativePDF';
import MinimalPDF from '@/components/pdf/MinimalPDF';
import { Document, Page } from '@react-pdf/renderer';
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

    // Use the provided template parameter instead of data.selectedTemplate
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

    // Create the PDF document with a single page to avoid blank pages
    const pdfDoc = (
      <Document>
        <Page size="A4">
          <PdfComponent data={data} />
        </Page>
      </Document>
    );

    // Generate the PDF blob
    const blob = await pdf(pdfDoc).toBlob();

    // Download the file using file-saver
    saveAs(blob, filename);

    return true;
  } catch (error) {
    console.error("PDF Export Error:", error);
    return false;
  }
};
