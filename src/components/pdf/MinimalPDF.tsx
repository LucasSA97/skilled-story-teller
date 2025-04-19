
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { CVData } from "@/types";

interface MinimalPDFProps {
  data: CVData;
}

// Crear estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
    color: "#333333",
  },
  jobTitle: {
    fontSize: 12,
    color: "#777777",
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 9,
    color: "#666666",
  },
  photoContainer: {
    width: 70,
  },
  photo: {
    width: 60,
    height: 60,
    objectFit: "cover",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    color: "#333333",
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#555555",
  },
  expItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  expDates: {
    width: "25%",
    fontSize: 9,
    color: "#777777",
    paddingRight: 10,
  },
  expLocation: {
    fontSize: 9,
    color: "#999999",
    marginTop: 3,
  },
  expDetails: {
    width: "75%",
  },
  expTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
    color: "#333333",
  },
  expCompany: {
    fontSize: 10,
    marginBottom: 4,
    color: "#555555",
  },
  expDescription: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#666666",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    fontSize: 9,
    backgroundColor: "#F5F5F5",
    padding: "3 8",
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 3,
    color: "#555555",
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    marginBottom: 4,
  },
  columns: {
    flexDirection: "row",
    marginBottom: 20,
  },
  column: {
    width: "50%",
    paddingRight: 10,
  },
  links: {
    marginTop: 20,
    fontSize: 9,
    color: "#777777",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  link: {
    marginRight: 15,
  },
  footer: {
    marginTop: 20,
    fontSize: 8,
    color: "#999999",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 10,
  },
});

const MinimalPDF = ({ data }: MinimalPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            {data.workExperience.length > 0 && data.workExperience[0].position && (
              <Text style={styles.jobTitle}>{data.workExperience[0].position}</Text>
            )}
            <View style={styles.contactInfo}>
              {data.contactInfo.email && (
                <Text>{data.contactInfo.email}</Text>
              )}
              {data.contactInfo.phone && (
                <Text>{data.contactInfo.phone}</Text>
              )}
              {data.contactInfo.address && (
                <Text>{data.contactInfo.address}</Text>
              )}
            </View>
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
            <Text style={styles.sectionTitle}>Sobre mí</Text>
            <Text style={styles.paragraph}>{data.professionalSummary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia</Text>
            {data.workExperience.map((job) => (
              <View key={job.id} style={styles.expItem}>
                <View style={styles.expDates}>
                  <Text>{job.startDate} - {job.current ? "Presente" : job.endDate}</Text>
                  <Text style={styles.expLocation}>{job.location}</Text>
                </View>
                <View style={styles.expDetails}>
                  <Text style={styles.expTitle}>{job.position}</Text>
                  <Text style={styles.expCompany}>{job.company}</Text>
                  <Text style={styles.expDescription}>{job.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Educación</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.expItem}>
                <View style={styles.expDates}>
                  <Text>{edu.startDate} - {edu.current ? "Presente" : edu.endDate}</Text>
                  <Text style={styles.expLocation}>{edu.location}</Text>
                </View>
                <View style={styles.expDetails}>
                  <Text style={styles.expTitle}>{edu.degree}</Text>
                  <Text style={styles.expCompany}>{edu.institution}</Text>
                  {edu.grade && <Text style={styles.expDescription}>Calificación: {edu.grade}</Text>}
                </View>
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
                <View key={language.id} style={styles.languageItem}>
                  <Text>{language.name}</Text>
                  <Text>{language.level}</Text>
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

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            {data.personalInfo.nationality && `Nacionalidad: ${data.personalInfo.nationality}`}
            {data.personalInfo.nationality && data.personalInfo.birthDate && " • "}
            {data.personalInfo.birthDate && `Fecha de nacimiento: ${data.personalInfo.birthDate}`}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MinimalPDF;
