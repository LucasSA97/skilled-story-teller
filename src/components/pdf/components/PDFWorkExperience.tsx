
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { WorkExperience } from "@/types";
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
    lineHeight: 1.5,
  },
});

const PDFWorkExperience = ({ experiences }: { experiences: WorkExperience[] }) => (
  <PDFSection title="Experiencia Laboral">
    {experiences.map((job) => (
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
  </PDFSection>
);

export default PDFWorkExperience;
