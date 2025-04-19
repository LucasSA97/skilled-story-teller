
import { CVData } from "@/types";

interface MinimalTemplateProps {
  data: CVData;
}

const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  return (
    <div className="font-sans max-w-4xl mx-auto bg-white shadow-lg">
      {/* Encabezado */}
      <header className="p-8 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{data.personalInfo.fullName}</h1>
            {data.workExperience.length > 0 && data.workExperience[0].position && (
              <p className="text-gray-600 mb-4">{data.workExperience[0].position}</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
              {data.contactInfo.email && (
                <div>{data.contactInfo.email}</div>
              )}
              {data.contactInfo.phone && (
                <div>{data.contactInfo.phone}</div>
              )}
              {data.contactInfo.address && (
                <div>{data.contactInfo.address}</div>
              )}
            </div>
          </div>
          
          {data.personalInfo.photo && (
            <div>
              <img
                src={data.personalInfo.photo}
                alt={data.personalInfo.fullName}
                className="w-24 h-24 object-cover rounded"
              />
            </div>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Resumen Profesional */}
        {data.professionalSummary && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Sobre mí</h2>
            <p className="text-gray-700 leading-relaxed">{data.professionalSummary}</p>
          </section>
        )}

        {/* Experiencia Laboral */}
        {data.workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Experiencia</h2>
            <div className="space-y-6">
              {data.workExperience.map((job) => (
                <div key={job.id} className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4 text-gray-500 text-sm">
                    <span>{job.startDate}</span>
                    <span> – </span>
                    <span>{job.current ? "Presente" : job.endDate}</span>
                    <div className="mt-1 text-gray-400">{job.location}</div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-base font-medium text-gray-900 mb-1">{job.position}</h3>
                    <div className="text-gray-700 mb-2">{job.company}</div>
                    <p className="text-gray-600 text-sm">{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educación */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Educación</h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4 text-gray-500 text-sm">
                    <span>{edu.startDate}</span>
                    <span> – </span>
                    <span>{edu.current ? "Presente" : edu.endDate}</span>
                    <div className="mt-1 text-gray-400">{edu.location}</div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-base font-medium text-gray-900 mb-1">{edu.degree}</h3>
                    <div className="text-gray-700 mb-1">{edu.institution}</div>
                    {edu.grade && <p className="text-gray-600 text-sm">{edu.grade}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Habilidades y competencias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Habilidades */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm"
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
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Idiomas</h2>
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

        {/* Enlaces */}
        {(data.contactInfo.website || data.contactInfo.linkedin || data.contactInfo.github) && (
          <section className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Enlaces</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              {data.contactInfo.website && (
                <a
                  href={data.contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sitio Web
                </a>
              )}
              {data.contactInfo.linkedin && (
                <a
                  href={data.contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  LinkedIn
                </a>
              )}
              {data.contactInfo.github && (
                <a
                  href={data.contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  GitHub
                </a>
              )}
            </div>
          </section>
        )}

        {/* Información personal adicional */}
        <div className="mt-6 text-sm text-gray-500">
          <div className="flex flex-wrap gap-x-4">
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

export default MinimalTemplate;
