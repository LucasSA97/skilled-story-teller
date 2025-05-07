
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
    </div>
  );
};

export default SummaryForm;
