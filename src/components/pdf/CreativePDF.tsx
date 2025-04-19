
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { CVData } from "@/types";

interface CreativePDFProps {
  data: CVData;
}

// Crear estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#6d28d9",
    color: "white",
    padding: 20,
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    border: "4px solid #a78bfa",
  },
  nameTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 12,
    color: "#e9d5ff",
    marginBottom: 20,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarSectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#a78bfa",
  },
  contactItem: {
    marginBottom: 8,
    fontSize: 10,
  },
  skillsContainer: {
    marginTop: 5,
  },
  skill: {
    backgroundColor: "#7c3aed",
    padding: "4 8",
    borderRadius: 10,
    marginBottom: 5,
    fontSize: 9,
    marginRight: 5,
  },
  language: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    marginBottom: 8,
  },
  languageLevel: {
    color: "#e9d5ff",
  },
  personalInfo: {
    fontSize: 10,
    marginTop: 5,
  },
  personalInfoLabel: {
    color: "#e9d5ff",
  },
  content: {
    width: "70%",
    padding: 20,
  },
  contentSection: {
    marginBottom: 20,
  },
  contentSectionTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 15,
    color: "#6d28d9",
    padding: 5,
    backgroundColor: "#f5f3ff",
    borderRadius: 4,
  },
  timelineItem: {
    marginBottom: 15,
    position: "relative",
    paddingLeft: 15,
    borderLeftWidth: 2,
    borderLeftColor: "#e9d5ff",
    paddingBottom: 5,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#6d28d9",
    marginBottom: 3,
  },
  itemCompany: {
    fontSize: 11,
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 10,
    color: "#666",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 10,
    color: "#444",
    lineHeight: 1.5,
  },
  links: {
    marginTop: 15,
    fontSize: 10,
  },
  link: {
    marginBottom: 5,
    color: "#f5f3ff",
  },
});

const CreativePDF = ({ data }: CreativePDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {data.personalInfo.photo && (
            <View style={styles.photoContainer}>
              <Image src={data.personalInfo.photo} style={styles.photo} />
            </View>
          )}
          
          <Text style={styles.nameTitle}>{data.personalInfo.fullName}</Text>
          {data.workExperience.length > 0 && data.workExperience[0].position && (
            <Text style={styles.jobTitle}>{data.workExperience[0].position}</Text>
          )}
          
          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contacto</Text>
            {data.contactInfo.email && (
              <Text style={styles.contactItem}>{data.contactInfo.email}</Text>
            )}
            {data.contactInfo.phone && (
              <Text style={styles.contactItem}>{data.contactInfo.phone}</Text>
            )}
            {data.contactInfo.address && (
              <Text style={styles.contactItem}>{data.contactInfo.address}</Text>
            )}
          </View>
          
          {/* Links */}
          {(data.contactInfo.website || data.contactInfo.linkedin || data.contactInfo.github) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Perfiles</Text>
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
            </View>
          )}
          
          {/* Skills */}
          {data.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Habilidades</Text>
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
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Idiomas</Text>
              {data.languages.map((language) => (
                <View key={language.id} style={styles.language}>
                  <Text>{language.name}</Text>
                  <Text style={styles.languageLevel}>{language.level}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Personal Info */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Personal</Text>
            {data.personalInfo.nationality && (
              <Text style={styles.personalInfo}>
                <Text style={styles.personalInfoLabel}>Nacionalidad: </Text>
                {data.personalInfo.nationality}
              </Text>
            )}
            {data.personalInfo.birthDate && (
              <Text style={styles.personalInfo}>
                <Text style={styles.personalInfoLabel}>Fecha de nacimiento: </Text>
                {data.personalInfo.birthDate}
              </Text>
            )}
          </View>
        </View>
        
        {/* Main Content */}
        <View style={styles.content}>
          {/* Professional Summary */}
          {data.professionalSummary && (
            <View style={styles.contentSection}>
              <Text style={styles.contentSectionTitle}>Perfil Profesional</Text>
              <Text style={styles.itemDescription}>{data.professionalSummary}</Text>
            </View>
          )}
          
          {/* Work Experience */}
          {data.workExperience.length > 0 && (
            <View style={styles.contentSection}>
              <Text style={styles.contentSectionTitle}>Experiencia Laboral</Text>
              {data.workExperience.map((job) => (
                <View key={job.id} style={styles.timelineItem}>
                  <Text style={styles.itemTitle}>{job.position}</Text>
                  <Text style={styles.itemCompany}>{job.company}, {job.location}</Text>
                  <Text style={styles.itemDate}>
                    {job.startDate} - {job.current ? "Presente" : job.endDate}
                  </Text>
                  <Text style={styles.itemDescription}>{job.description}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Education */}
          {data.education.length > 0 && (
            <View style={styles.contentSection}>
              <Text style={styles.contentSectionTitle}>Educación</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.timelineItem}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemCompany}>{edu.institution}, {edu.location}</Text>
                  <Text style={styles.itemDate}>
                    {edu.startDate} - {edu.current ? "Presente" : edu.endDate}
                  </Text>
                  {edu.grade && <Text style={styles.itemDescription}>Calificación: {edu.grade}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CreativePDF;
