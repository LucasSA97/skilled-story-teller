
import { CVData } from "@/types";

interface ClassicTemplateProps {
  data: CVData;
}

const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  return (
    <div className="font-serif max-w-4xl mx-auto bg-white shadow-lg">
      {/* Encabezado */}
      <header className="text-center p-8 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">{data.personalInfo.fullName}</h1>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-2">
          {data.contactInfo.phone && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {data.contactInfo.phone}
            </div>
          )}
          {data.contactInfo.email && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {data.contactInfo.email}
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
        
        <div className="flex flex-wrap justify-center gap-x-4 text-sm text-gray-600">
          {data.contactInfo.website && (
            <a
              href={data.contactInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {data.contactInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          )}
          {data.contactInfo.linkedin && (
            <a
              href={data.contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          )}
          {data.contactInfo.github && (
            <a
              href={data.contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
        
        {data.personalInfo.photo && (
          <div className="mt-4 flex justify-center">
            <img
              src={data.personalInfo.photo}
              alt={data.personalInfo.fullName}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        )}
      </header>

      <div className="p-8">
        {/* Resumen Profesional */}
        {data.professionalSummary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Perfil Profesional</h2>
            <p className="text-gray-700 leading-relaxed">{data.professionalSummary}</p>
          </section>
        )}

        {/* Experiencia Laboral */}
        {data.workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Experiencia Laboral</h2>
            <div className="space-y-6">
              {data.workExperience.map((job) => (
                <div key={job.id}>
                  <div className="flex flex-col md:flex-row md:justify-between mb-1">
                    <h3 className="text-lg font-semibold">{job.position}</h3>
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
            <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Educación</h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col md:flex-row md:justify-between mb-1">
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Habilidades */}
          {data.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Habilidades</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {data.skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Idiomas */}
          {data.languages.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Idiomas</h2>
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

        {/* Información adicional */}
        <div className="mt-6 pt-6 border-t border-gray-300 text-sm text-gray-600">
          <div className="flex gap-x-4">
            {data.personalInfo.nationality && (
              <span>Nacionalidad: {data.personalInfo.nationality}</span>
            )}
            {data.personalInfo.birthDate && (
              <span>Fecha de nacimiento: {data.personalInfo.birthDate}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;
