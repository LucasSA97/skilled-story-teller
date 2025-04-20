
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { ContactInfo } from "@/types";

const styles = StyleSheet.create({
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

const PDFLinks = ({ contactInfo }: { contactInfo: ContactInfo }) => {
  if (!contactInfo.website && !contactInfo.linkedin && !contactInfo.github) {
    return null;
  }

  return (
    <View style={styles.links}>
      {contactInfo.website && (
        <Text style={styles.link}>
          Web: {contactInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
        </Text>
      )}
      {contactInfo.linkedin && (
        <Text style={styles.link}>
          LinkedIn: {contactInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
        </Text>
      )}
      {contactInfo.github && (
        <Text style={styles.link}>
          GitHub: {contactInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
        </Text>
      )}
    </View>
  );
};

export default PDFLinks;
