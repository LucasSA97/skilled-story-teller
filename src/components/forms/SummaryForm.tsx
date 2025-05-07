
import { useCVContext } from "@/context/CVContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SummaryForm = () => {
  const { cvState, updateProfessionalSummary } = useCVContext();
  const { professionalSummary } = cvState.data;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateProfessionalSummary(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="summary">Perfil Profesional*</Label>
        <Textarea
          id="summary"
          value={professionalSummary}
          onChange={handleChange}
          placeholder="Escribe un breve resumen sobre tus habilidades, experiencia y objetivos profesionales..."
          className="min-h-[200px]"
          required
        />
      </div>
      
      <div className="bg-secondary/50 dark:bg-secondary/20 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Consejos para escribir un buen perfil profesional:</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Mantén la extensión entre 3-5 frases.</li>
          <li>Destaca tus logros más relevantes y habilidades clave.</li>
          <li>Adapta el perfil al tipo de trabajo que buscas.</li>
          <li>Menciona tu experiencia en años si es relevante.</li>
          <li>Evita clichés y frases genéricas.</li>
        </ul>
      </div>
    </div>
  );
};

export default SummaryForm;
