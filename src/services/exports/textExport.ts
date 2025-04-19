
import { ExportOptions } from "./types";

export const exportToTextFile = ({ data, filename }: ExportOptions): boolean => {
  try {
    let content = `CURRÍCULUM VITAE\n\n`;
    
    // Personal Info Section
    content += `INFORMACIÓN PERSONAL\n`;
    content += `====================\n`;
    content += `Nombre: ${data.personalInfo.fullName || 'N/A'}\n`;
    if (data.personalInfo.nationality) content += `Nacionalidad: ${data.personalInfo.nationality}\n`;
    if (data.personalInfo.birthDate) content += `Fecha de nacimiento: ${data.personalInfo.birthDate}\n`;
    content += `\n`;
    
    // Contact Info Section
    content += `CONTACTO\n`;
    content += `========\n`;
    if (data.contactInfo.email) content += `Email: ${data.contactInfo.email}\n`;
    if (data.contactInfo.phone) content += `Teléfono: ${data.contactInfo.phone}\n`;
    if (data.contactInfo.address) content += `Dirección: ${data.contactInfo.address}\n`;
    if (data.contactInfo.website) content += `Sitio web: ${data.contactInfo.website}\n`;
    if (data.contactInfo.linkedin) content += `LinkedIn: ${data.contactInfo.linkedin}\n`;
    if (data.contactInfo.github) content += `GitHub: ${data.contactInfo.github}\n`;
    content += `\n`;
    
    // Professional Summary Section
    if (data.professionalSummary) {
      content += `PERFIL PROFESIONAL\n`;
      content += `=================\n`;
      content += `${data.professionalSummary}\n\n`;
    }
    
    // Work Experience Section
    if (data.workExperience.length > 0) {
      content += `EXPERIENCIA LABORAL\n`;
      content += `==================\n`;
      data.workExperience.forEach(job => {
        content += `${job.position} en ${job.company}, ${job.location}\n`;
        content += `${job.startDate} - ${job.current ? 'Presente' : job.endDate}\n`;
        content += `${job.description}\n\n`;
      });
    }
    
    // Education Section
    if (data.education.length > 0) {
      content += `EDUCACIÓN\n`;
      content += `=========\n`;
      data.education.forEach(edu => {
        content += `${edu.degree}, ${edu.institution}, ${edu.location}\n`;
        content += `${edu.startDate} - ${edu.current ? 'Presente' : edu.endDate}\n`;
        if (edu.grade) content += `Calificación: ${edu.grade}\n`;
        content += `\n`;
      });
    }
    
    // Skills Section
    if (data.skills.length > 0) {
      content += `HABILIDADES\n`;
      content += `===========\n`;
      data.skills.forEach(skill => {
        content += `• ${skill.name}\n`;
      });
      content += `\n`;
    }
    
    // Languages Section
    if (data.languages.length > 0) {
      content += `IDIOMAS\n`;
      content += `=======\n`;
      data.languages.forEach(language => {
        content += `${language.name}: ${language.level}\n`;
      });
      content += `\n`;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error("Error al exportar a texto:", error);
    return false;
  }
};
