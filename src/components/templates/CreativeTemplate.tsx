
import { CVData } from "@/types";

interface CreativeTemplateProps {
  data: CVData;
}

const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  return (
    <div className="font-sans max-w-4xl mx-auto bg-white shadow-lg">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row">
        {/* Barra lateral */}
        <div className="bg-purple-700 text-white p-8 md:w-1/3">
          {data.personalInfo.photo && (
            <div className="mb-6 flex justify-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-300">
                <img
                  src={data.personalInfo.photo}
                  alt={data.personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">{data.personalInfo.fullName}</h1>
            {data.workExperience.length > 0 && data.workExperience[0].position && (
              <p className="text-purple-200">{data.workExperience[0].position}</p>
            )}
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-3 border-b border-purple-500 pb-1">Contacto</h2>
              <div className="space-y-2 text-sm">
                {data.contactInfo.email && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">{data.contactInfo.email}</span>
                  </div>
                )}
                {data.contactInfo.phone && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {data.contactInfo.phone}
                  </div>
                )}
                {data.contactInfo.address && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{data.contactInfo.address}</span>
                  </div>
                )}
                {data.contactInfo.website && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <a href={data.contactInfo.website} className="hover:text-purple-300 break-all" target="_blank" rel="noopener noreferrer">
                      {data.contactInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </div>
                )}
              </div>
            </section>
            
            {/* Enlaces Adicionales */}
            {(data.contactInfo.linkedin || data.contactInfo.github) && (
              <section>
                <h2 className="text-lg font-semibold mb-3 border-b border-purple-500 pb-1">Perfiles</h2>
                <div className="space-y-2 text-sm">
                  {data.contactInfo.linkedin && (
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 text-purple-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <a href={data.contactInfo.linkedin} className="hover:text-purple-300 break-all" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </div>
                  )}
                  {data.contactInfo.github && (
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 text-purple-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      <a href={data.contactInfo.github} className="hover:text-purple-300 break-all" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </div>
                  )}
                </div>
              </section>
            )}
            
            {/* Habilidades */}
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3 border-b border-purple-500 pb-1">Habilidades</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-purple-800 px-3 py-1 rounded-full text-xs"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
            
            {/* Idiomas */}
            {data.languages.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3 border-b border-purple-500 pb-1">Idiomas</h2>
                <ul className="space-y-2">
                  {data.languages.map((language) => (
                    <li key={language.id} className="flex justify-between">
                      <span>{language.name}</span>
                      <span className="text-purple-300 text-sm">{language.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            
            {/* Información personal */}
            <section>
              <h2 className="text-lg font-semibold mb-3 border-b border-purple-500 pb-1">Personal</h2>
              <ul className="space-y-2 text-sm">
                {data.personalInfo.nationality && (
                  <li>
                    <span className="text-purple-300">Nacionalidad:</span> {data.personalInfo.nationality}
                  </li>
                )}
                {data.personalInfo.birthDate && (
                  <li>
                    <span className="text-purple-300">Fecha de nacimiento:</span> {data.personalInfo.birthDate}
                  </li>
                )}
              </ul>
            </section>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="p-8 md:w-2/3">
          {/* Resumen Profesional */}
          {data.professionalSummary && (
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold mr-3">
                  P
                </div>
                <h2 className="text-xl font-bold text-gray-800">Perfil Profesional</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{data.professionalSummary}</p>
            </section>
          )}

          {/* Experiencia Laboral */}
          {data.workExperience.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold mr-3">
                  E
                </div>
                <h2 className="text-xl font-bold text-gray-800">Experiencia Laboral</h2>
              </div>
              <div className="space-y-6">
                {data.workExperience.map((job) => (
                  <div key={job.id} className="relative pl-6 border-l-2 border-purple-200">
                    <div className="absolute left-[-5px] top-1 w-8 h-8 bg-white border-2 border-purple-500 rounded-full"></div>
                    <div className="mb-1">
                      <h3 className="text-lg font-semibold text-purple-700">{job.position}</h3>
                      <div className="text-gray-800 mb-1">
                        {job.company}, {job.location}
                      </div>
                      <div className="text-gray-500 text-sm mb-2">
                        {job.startDate} - {job.current ? "Presente" : job.endDate}
                      </div>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Educación */}
          {data.education.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold mr-3">
                  F
                </div>
                <h2 className="text-xl font-bold text-gray-800">Educación</h2>
              </div>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 border-l-2 border-purple-200">
                    <div className="absolute left-[-5px] top-1 w-8 h-8 bg-white border-2 border-purple-500 rounded-full"></div>
                    <div className="mb-1">
                      <h3 className="text-lg font-semibold text-purple-700">{edu.degree}</h3>
                      <div className="text-gray-800 mb-1">
                        {edu.institution}, {edu.location}
                      </div>
                      <div className="text-gray-500 text-sm mb-2">
                        {edu.startDate} - {edu.current ? "Presente" : edu.endDate}
                      </div>
                      {edu.grade && <p className="text-gray-600 italic">Calificación: {edu.grade}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
