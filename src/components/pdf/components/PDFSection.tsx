
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ReactNode } from "react";

interface PDFSectionProps {
  title: string;
  children: ReactNode;
}

const styles = StyleSheet.create({
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
});

const PDFSection = ({ title, children }: PDFSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export default PDFSection;
