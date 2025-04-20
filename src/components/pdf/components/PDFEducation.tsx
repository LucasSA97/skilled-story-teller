
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Education } from "@/types";
import PDFSection from "./PDFSection";

const styles = StyleSheet.create({
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
  },
});

const PDFEducation = ({ education }: { education: Education[] }) => (
  <PDFSection title="Educación">
    {education.map((edu) => (
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
  </PDFSection>
);

export default PDFEducation;
