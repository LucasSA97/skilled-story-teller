
import { ExportOptions } from "./types";

export const exportToHTML = ({ data, filename }: ExportOptions): boolean => {
  try {
    const content = `
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

        ${data.professionalSummary ? `
          <h2>Perfil Profesional</h2>
          <p>${data.professionalSummary}</p>
        ` : ''}

        ${data.workExperience.length > 0 ? `
          <h2>Experiencia Laboral</h2>
          ${data.workExperience.map(job => `
            <div class="job-item">
              <div class="job-header">
                <span class="job-title">${job.position}</span>
                <span class="job-date">${job.startDate} - ${job.current ? 'Presente' : job.endDate}</span>
              </div>
              <div class="job-company">${job.company}, ${job.location}</div>
              <p>${job.description}</p>
            </div>
          `).join('')}
        ` : ''}

        ${data.education.length > 0 ? `
          <h2>Educación</h2>
          ${data.education.map(edu => `
            <div class="edu-item">
              <div class="edu-header">
                <span class="edu-degree">${edu.degree}</span>
                <span class="edu-date">${edu.startDate} - ${edu.current ? 'Presente' : edu.endDate}</span>
              </div>
              <div class="edu-institution">${edu.institution}, ${edu.location}</div>
              ${edu.grade ? `<p>Calificación: ${edu.grade}</p>` : ''}
            </div>
          `).join('')}
        ` : ''}

        ${data.skills.length > 0 ? `
          <h2>Habilidades</h2>
          <div class="skills-container">
            ${data.skills.map(skill => `
              <div class="skill-item">${skill.name}</div>
            `).join('')}
          </div>
        ` : ''}

        ${data.languages.length > 0 ? `
          <h2>Idiomas</h2>
          ${data.languages.map(language => `
            <div class="language-item">
              <span>${language.name}</span>
              <span>${language.level}</span>
            </div>
          `).join('')}
        ` : ''}
      </body>
      </html>
    `;
    
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
