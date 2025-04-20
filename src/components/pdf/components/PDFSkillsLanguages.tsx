
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Skill, Language } from "@/types";
import PDFSection from "./PDFSection";

const styles = StyleSheet.create({
  columns: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
    paddingRight: 10,
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
});

interface PDFSkillsLanguagesProps {
  skills: Skill[];
  languages: Language[];
}

const PDFSkillsLanguages = ({ skills, languages }: PDFSkillsLanguagesProps) => (
  <View style={styles.columns}>
    {skills.length > 0 && (
      <View style={styles.column}>
        <PDFSection title="Habilidades">
          <View style={styles.skillsContainer}>
            {skills.map((skill) => (
              <Text key={skill.id} style={styles.skill}>
                {skill.name}
              </Text>
            ))}
          </View>
        </PDFSection>
      </View>
    )}

    {languages.length > 0 && (
      <View style={styles.column}>
        <PDFSection title="Idiomas">
          {languages.map((language) => (
            <View key={language.id} style={styles.language}>
              <Text style={styles.languageName}>{language.name}</Text>
              <Text style={styles.languageLevel}>{language.level}</Text>
            </View>
          ))}
        </PDFSection>
      </View>
    )}
  </View>
);

export default PDFSkillsLanguages;
