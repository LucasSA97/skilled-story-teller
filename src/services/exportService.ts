
import { CVData } from "@/types";

/**
 * Exporta los datos del CV a un archivo de texto plano
 * Esta es una solución alternativa cuando la generación de PDF falla
 */
export const exportToTextFile = (data: CVData, filename: string): boolean => {
  try {
    // Crear contenido de texto con formato
    let content = `CURRÍCULUM VITAE\n\n`;
    
    // Información personal
    content += `INFORMACIÓN PERSONAL\n`;
    content += `====================\n`;
    content += `Nombre: ${data.personalInfo.fullName || 'N/A'}\n`;
    if (data.personalInfo.nationality) content += `Nacionalidad: ${data.personalInfo.nationality}\n`;
    if (data.personalInfo.birthDate) content += `Fecha de nacimiento: ${data.personalInfo.birthDate}\n`;
    content += `\n`;
    
    // Información de contacto
    content += `CONTACTO\n`;
    content += `========\n`;
    if (data.contactInfo.email) content += `Email: ${data.contactInfo.email}\n`;
    if (data.contactInfo.phone) content += `Teléfono: ${data.contactInfo.phone}\n`;
    if (data.contactInfo.address) content += `Dirección: ${data.contactInfo.address}\n`;
    if (data.contactInfo.website) content += `Sitio web: ${data.contactInfo.website}\n`;
    if (data.contactInfo.linkedin) content += `LinkedIn: ${data.contactInfo.linkedin}\n`;
    if (data.contactInfo.github) content += `GitHub: ${data.contactInfo.github}\n`;
    content += `\n`;
    
    // Resumen profesional
    if (data.professionalSummary) {
      content += `PERFIL PROFESIONAL\n`;
      content += `=================\n`;
      content += `${data.professionalSummary}\n\n`;
    }
    
    // Experiencia laboral
    if (data.workExperience.length > 0) {
      content += `EXPERIENCIA LABORAL\n`;
      content += `==================\n`;
      data.workExperience.forEach(job => {
        content += `${job.position} en ${job.company}, ${job.location}\n`;
        content += `${job.startDate} - ${job.current ? 'Presente' : job.endDate}\n`;
        content += `${job.description}\n\n`;
      });
    }
    
    // Educación
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
    
    // Habilidades
    if (data.skills.length > 0) {
      content += `HABILIDADES\n`;
      content += `===========\n`;
      data.skills.forEach(skill => {
        content += `• ${skill.name}\n`;
      });
      content += `\n`;
    }
    
    // Idiomas
    if (data.languages.length > 0) {
      content += `IDIOMAS\n`;
      content += `=======\n`;
      data.languages.forEach(language => {
        content += `${language.name}: ${language.level}\n`;
      });
      content += `\n`;
    }
    
    // Crear blob y descargar
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

/**
 * Exporta los datos del CV a un archivo HTML
 * Esta es una solución alternativa más rica visualmente
 */
export const exportToHTML = (data: CVData, filename: string): boolean => {
  try {
    // Crear contenido HTML con estilos básicos
    let content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>CV - ${data.personalInfo.fullName}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
          h2 { color: #3498db; margin-top: 30px; }
          .personal-info { display: flex; justify-content: space-between; }
          .contact-item { margin-bottom: 5px; }
          .job-item, .edu-item { margin-bottom: 20px; }
          .job-header, .edu-header { display: flex; justify-content: space-between; }
          .job-title, .edu-degree { font-weight: bold; color: #2c3e50; }
          .job-company, .edu-institution { font-style: italic; }
          .job-date, .edu-date { color: #7f8c8d; }
          .skills-container { display: flex; flex-wrap: wrap; }
          .skill-item { background-color: #eaf2f8; padding: 5px 10px; margin: 5px; border-radius: 3px; }
          .language-item { display: flex; justify-content: space-between; margin-bottom: 5px; }
        </style>
      </head>
      <body>
        <h1>${data.personalInfo.fullName}</h1>
        
        <div class="personal-info">
          <div>
            ${data.personalInfo.nationality ? `<p>Nacionalidad: ${data.personalInfo.nationality}</p>` : ''}
            ${data.personalInfo.birthDate ? `<p>Fecha de nacimiento: ${data.personalInfo.birthDate}</p>` : ''}
          </div>
          
          <div>
            ${data.contactInfo.email ? `<div class="contact-item">Email: ${data.contactInfo.email}</div>` : ''}
            ${data.contactInfo.phone ? `<div class="contact-item">Teléfono: ${data.contactInfo.phone}</div>` : ''}
            ${data.contactInfo.address ? `<div class="contact-item">Dirección: ${data.contactInfo.address}</div>` : ''}
            ${data.contactInfo.website ? `<div class="contact-item">Web: ${data.contactInfo.website}</div>` : ''}
            ${data.contactInfo.linkedin ? `<div class="contact-item">LinkedIn: ${data.contactInfo.linkedin}</div>` : ''}
            ${data.contactInfo.github ? `<div class="contact-item">GitHub: ${data.contactInfo.github}</div>` : ''}
          </div>
        </div>
    `;
    
    // Resumen profesional
    if (data.professionalSummary) {
      content += `
        <h2>Perfil Profesional</h2>
        <p>${data.professionalSummary}</p>
      `;
    }
    
    // Experiencia laboral
    if (data.workExperience.length > 0) {
      content += `<h2>Experiencia Laboral</h2>`;
      
      data.workExperience.forEach(job => {
        content += `
          <div class="job-item">
            <div class="job-header">
              <span class="job-title">${job.position}</span>
              <span class="job-date">${job.startDate} - ${job.current ? 'Presente' : job.endDate}</span>
            </div>
            <div class="job-company">${job.company}, ${job.location}</div>
            <p>${job.description}</p>
          </div>
        `;
      });
    }
    
    // Educación
    if (data.education.length > 0) {
      content += `<h2>Educación</h2>`;
      
      data.education.forEach(edu => {
        content += `
          <div class="edu-item">
            <div class="edu-header">
              <span class="edu-degree">${edu.degree}</span>
              <span class="edu-date">${edu.startDate} - ${edu.current ? 'Presente' : edu.endDate}</span>
            </div>
            <div class="edu-institution">${edu.institution}, ${edu.location}</div>
            ${edu.grade ? `<p>Calificación: ${edu.grade}</p>` : ''}
          </div>
        `;
      });
    }
    
    // Habilidades
    if (data.skills.length > 0) {
      content += `
        <h2>Habilidades</h2>
        <div class="skills-container">
      `;
      
      data.skills.forEach(skill => {
        content += `<div class="skill-item">${skill.name}</div>`;
      });
      
      content += `</div>`;
    }
    
    // Idiomas
    if (data.languages.length > 0) {
      content += `<h2>Idiomas</h2>`;
      
      data.languages.forEach(language => {
        content += `
          <div class="language-item">
            <span>${language.name}</span>
            <span>${language.level}</span>
          </div>
        `;
      });
    }
    
    // Cerrar HTML
    content += `
      </body>
      </html>
    `;
    
    // Crear blob y descargar
    const blob = new Blob([content], { type: 'text/html' });
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
    console.error("Error al exportar a HTML:", error);
    return false;
  }
};
