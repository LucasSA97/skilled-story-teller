
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { CVData } from "@/types";

interface ClassicPDFProps {
  data: CVData;
}

// Crear estilos
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Times-Roman",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: "Times-Bold",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    fontSize: 10,
    marginBottom: 5,
  },
  contactItem: {
    marginHorizontal: 8,
    marginBottom: 3,
  },
  links: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    fontSize: 10,
  },
  link: {
    marginHorizontal: 8,
  },
  photoContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  itemContainer: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
  },
  itemDate: {
    fontSize: 10,
    color: "#333",
  },
  itemSubtitle: {
    fontSize: 11,
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 10,
    color: "#333",
    lineHeight: 1.5,
  },
  columns: {
    flexDirection: "row",
    marginTop: 5,
  },
  column: {
    flex: 1,
    paddingRight: 10,
  },
  skill: {
    fontSize: 10,
    marginBottom: 5,
  },
  language: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    marginBottom: 5,
  },
  footer: {
    marginTop: 20,
    fontSize: 9,
    color: "#666",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 5,
  },
});

const ClassicPDF = ({ data }: ClassicPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          
          <View style={styles.contactInfo}>
            {data.contactInfo.phone && (
              <Text style={styles.contactItem}>{data.contactInfo.phone}</Text>
            )}
            {data.contactInfo.email && (
              <Text style={styles.contactItem}>{data.contactInfo.email}</Text>
            )}
            {data.contactInfo.address && (
              <Text style={styles.contactItem}>{data.contactInfo.address}</Text>
            )}
          </View>
          
          <View style={styles.links}>
            {data.contactInfo.website && (
              <Text style={styles.link}>
                {data.contactInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </Text>
            )}
            {data.contactInfo.linkedin && (
              <Text style={styles.link}>LinkedIn</Text>
            )}
            {data.contactInfo.github && (
              <Text style={styles.link}>GitHub</Text>
            )}
          </View>
          
          {data.personalInfo.photo && (
            <View style={styles.photoContainer}>
              <Image src={data.personalInfo.photo} style={styles.photo} />
            </View>
          )}
        </View>

        {/* Professional Summary */}
        {data.professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil Profesional</Text>
            <Text style={styles.itemDescription}>{data.professionalSummary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
            {data.workExperience.map((job) => (
              <View key={job.id} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{job.position}</Text>
                  <Text style={styles.itemDate}>
                    {job.startDate} - {job.current ? "Presente" : job.endDate}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{job.company}, {job.location}</Text>
                <Text style={styles.itemDescription}>{job.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Educación</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemDate}>
                    {edu.startDate} - {edu.current ? "Presente" : edu.endDate}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.institution}, {edu.location}</Text>
                {edu.grade && <Text style={styles.itemDescription}>Calificación: {edu.grade}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills and Languages */}
        <View style={styles.columns}>
          {/* Skills */}
          {data.skills.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Habilidades</Text>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skill}>
                  • {skill.name}
                </Text>
              ))}
            </View>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Idiomas</Text>
              {data.languages.map((language) => (
                <View key={language.id} style={styles.language}>
                  <Text>{language.name}</Text>
                  <Text>{language.level}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Footer with personal info */}
        <View style={styles.footer}>
          <Text>
            {data.personalInfo.nationality && `Nacionalidad: ${data.personalInfo.nationality} | `}
            {data.personalInfo.birthDate && `Fecha de nacimiento: ${data.personalInfo.birthDate}`}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ClassicPDF;
