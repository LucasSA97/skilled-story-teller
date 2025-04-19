
import { CVData } from "@/types";

interface ModernTemplateProps {
  data: CVData;
}

const ModernTemplate = ({ data }: ModernTemplateProps) => {
  return (
    <div className="font-sans max-w-4xl mx-auto bg-white shadow-lg">
      {/* Encabezado */}
      <header className="bg-blue-600 text-white p-8">
        <div className="flex flex-col md:flex-row md:items-center">
          {data.personalInfo.photo && (
            <div className="mb-4 md:mb-0 md:mr-6">
              <img
                src={data.personalInfo.photo}
                alt={data.personalInfo.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.personalInfo.nationality && (
                <span className="text-blue-100">
                  Nacionalidad: {data.personalInfo.nationality}
                </span>
              )}
              {data.personalInfo.birthDate && (
                <span className="text-blue-100">
                  Fecha de nacimiento: {data.personalInfo.birthDate}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {data.contactInfo.email && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {data.contactInfo.email}
                </div>
              )}
              {data.contactInfo.phone && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {data.contactInfo.phone}
                </div>
              )}
              {data.contactInfo.address && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {data.contactInfo.address}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Resumen Profesional */}
        {data.professionalSummary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2 mb-4">Perfil Profesional</h2>
            <p className="text-gray-700 leading-relaxed">{data.professionalSummary}</p>
          </section>
        )}

        {/* Experiencia Laboral */}
        {data.workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2 mb-4">Experiencia Laboral</h2>
            <div className="space-y-6">
              {data.workExperience.map((job) => (
                <div key={job.id}>
                  <div className="flex flex-wrap justify-between mb-1">
                    <h3 className="text-lg font-semibold text-blue-700">{job.position}</h3>
                    <span className="text-gray-600 text-sm">
                      {job.startDate} - {job.current ? "Presente" : job.endDate}
                    </span>
                  </div>
                  <div className="text-gray-800 mb-1">{job.company}, {job.location}</div>
                  <p className="text-gray-600 text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educación */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2 mb-4">Educación</h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-wrap justify-between mb-1">
                    <h3 className="text-lg font-semibold text-blue-700">{edu.degree}</h3>
                    <span className="text-gray-600 text-sm">
                      {edu.startDate} - {edu.current ? "Presente" : edu.endDate}
                    </span>
                  </div>
                  <div className="text-gray-800 mb-1">{edu.institution}, {edu.location}</div>
                  {edu.grade && <p className="text-gray-600 text-sm">Calificación: {edu.grade}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Habilidades */}
          {data.skills.length > 0 && (
            <section className="mb-8 md:w-1/2">
              <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2 mb-4">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Idiomas */}
          {data.languages.length > 0 && (
            <section className="mb-8 md:w-1/2">
              <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2 mb-4">Idiomas</h2>
              <ul className="space-y-2">
                {data.languages.map((language) => (
                  <li key={language.id} className="flex justify-between">
                    <span className="text-gray-800">{language.name}</span>
                    <span className="text-gray-600">{language.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
          {data.contactInfo.website && (
            <a
              href={data.contactInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Sitio Web
            </a>
          )}
          {data.contactInfo.linkedin && (
            <a
              href={data.contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          )}
          {data.contactInfo.github && (
            <a
              href={data.contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
