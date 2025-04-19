
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { CVData } from "@/types";

interface ModernPDFProps {
  data: CVData;
}

// Crear estilos
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#4361ee",
    padding: 20,
    color: "white",
  },
  photoContainer: {
    marginRight: 15,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    border: "2px solid white",
  },
  headerRight: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerDetails: {
    fontSize: 10,
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9,
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4361ee",
    paddingBottom: 3,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4361ee",
  },
  itemDate: {
    fontSize: 10,
    color: "#666",
  },
  itemSubtitle: {
    fontSize: 11,
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 10,
    color: "#444",
    lineHeight: 1.5,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  skill: {
    fontSize: 10,
    backgroundColor: "#e6efff",
    padding: "3 7",
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 10,
    color: "#4361ee",
  },
  language: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    marginBottom: 5,
  },
  languageName: {
    color: "#333",
  },
  languageLevel: {
    color: "#666",
  },
  columns: {
    flexDirection: "row",
    marginTop: 10,
  },
  column: {
    flex: 1,
    paddingRight: 10,
  },
  links: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    fontSize: 9,
    color: "#4361ee",
  },
  link: {
    marginRight: 10,
  },
});

const ModernPDF = ({ data }: ModernPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {data.personalInfo.photo && (
            <View style={styles.photoContainer}>
              <Image src={data.personalInfo.photo} style={styles.photo} />
            </View>
          )}
          
          <View style={styles.headerRight}>
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            <Text style={styles.headerDetails}>
              {data.personalInfo.nationality && `Nacionalidad: ${data.personalInfo.nationality}`}
              {data.personalInfo.nationality && data.personalInfo.birthDate && " | "}
              {data.personalInfo.birthDate && `Fecha de nacimiento: ${data.personalInfo.birthDate}`}
            </Text>
            
            <View style={styles.contactInfo}>
              {data.contactInfo.email && (
                <View style={styles.contactItem}>
                  <Text>{data.contactInfo.email}</Text>
                </View>
              )}
              {data.contactInfo.phone && (
                <View style={styles.contactItem}>
                  <Text>{data.contactInfo.phone}</Text>
                </View>
              )}
              {data.contactInfo.address && (
                <View style={styles.contactItem}>
                  <Text>{data.contactInfo.address}</Text>
                </View>
              )}
            </View>
          </View>
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
              <View style={styles.skillsContainer}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={styles.skill}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Idiomas</Text>
              {data.languages.map((language) => (
                <View key={language.id} style={styles.language}>
                  <Text style={styles.languageName}>{language.name}</Text>
                  <Text style={styles.languageLevel}>{language.level}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Links */}
        {(data.contactInfo.website || data.contactInfo.linkedin || data.contactInfo.github) && (
          <View style={styles.links}>
            {data.contactInfo.website && (
              <Text style={styles.link}>
                Web: {data.contactInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </Text>
            )}
            {data.contactInfo.linkedin && (
              <Text style={styles.link}>
                LinkedIn: {data.contactInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </Text>
            )}
            {data.contactInfo.github && (
              <Text style={styles.link}>
                GitHub: {data.contactInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
              </Text>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ModernPDF;
