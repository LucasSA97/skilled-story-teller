
import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { CVData } from "@/types";
import PDFHeader from "./components/PDFHeader";
import PDFSection from "./components/PDFSection";
import PDFWorkExperience from "./components/PDFWorkExperience";
import PDFEducation from "./components/PDFEducation";
import PDFSkillsLanguages from "./components/PDFSkillsLanguages";
import PDFLinks from "./components/PDFLinks";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  itemDescription: {
    fontSize: 10,
    color: "#444",
    lineHeight: 1.5,
  },
});

const ModernPDF = ({ data }: { data: CVData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PDFHeader 
        personalInfo={data.personalInfo}
        contactInfo={data.contactInfo}
      />

      {data.professionalSummary && (
        <PDFSection title="Perfil Profesional">
          <text style={styles.itemDescription}>{data.professionalSummary}</text>
        </PDFSection>
      )}

      {data.workExperience.length > 0 && (
        <PDFWorkExperience experiences={data.workExperience} />
      )}

      {data.education.length > 0 && (
        <PDFEducation education={data.education} />
      )}

      <PDFSkillsLanguages 
        skills={data.skills}
        languages={data.languages}
      />

      <PDFLinks contactInfo={data.contactInfo} />
    </Page>
  </Document>
);

export default ModernPDF;
