
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { PersonalInfo, ContactInfo } from "@/types";

interface PDFHeaderProps {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
}

const styles = StyleSheet.create({
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
});

const PDFHeader = ({ personalInfo, contactInfo }: PDFHeaderProps) => (
  <View style={styles.header}>
    {personalInfo.photo && (
      <View style={styles.photoContainer}>
        <Image src={personalInfo.photo} style={styles.photo} />
      </View>
    )}
    
    <View style={styles.headerRight}>
      <Text style={styles.name}>{personalInfo.fullName}</Text>
      <Text style={styles.headerDetails}>
        {personalInfo.nationality && `Nacionalidad: ${personalInfo.nationality}`}
        {personalInfo.nationality && personalInfo.birthDate && " | "}
        {personalInfo.birthDate && `Fecha de nacimiento: ${personalInfo.birthDate}`}
      </Text>
      
      <View style={styles.contactInfo}>
        {contactInfo.email && (
          <View style={styles.contactItem}>
            <Text>{contactInfo.email}</Text>
          </View>
        )}
        {contactInfo.phone && (
          <View style={styles.contactItem}>
            <Text>{contactInfo.phone}</Text>
          </View>
        )}
        {contactInfo.address && (
          <View style={styles.contactItem}>
            <Text>{contactInfo.address}</Text>
          </View>
        )}
      </View>
    </View>
  </View>
);

export default PDFHeader;
