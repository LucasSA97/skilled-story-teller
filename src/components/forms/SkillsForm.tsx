
import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const SkillsForm = () => {
  const { cvState, addSkill, removeSkill } = useCVContext();
  const { skills } = cvState.data;
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-2">
        <div className="flex-grow">
          <Label htmlFor="newSkill">Añadir Habilidad</Label>
          <Input
            id="newSkill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ej. React, Liderazgo de equipos, Excel avanzado..."
          />
        </div>
        <Button onClick={handleAddSkill} className="mb-0.5">Añadir</Button>
      </div>

      <div>
        <Label className="mb-2 block">Habilidades</Label>
        
        {skills.length === 0 ? (
          <div className="text-center py-6 bg-secondary/30 rounded-md">
            <p className="text-muted-foreground">Añade habilidades relevantes para tu CV</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1"
              >
                <span className="mr-1">{skill.name}</span>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-primary hover:text-primary/70 focus:outline-none ml-1"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-secondary/50 dark:bg-secondary/20 p-4 rounded-md mt-4">
        <h3 className="text-sm font-medium mb-2">Consejos para habilidades:</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Añade tanto habilidades técnicas como blandas.</li>
          <li>Incluye herramientas y tecnologías que domines.</li>
          <li>Sé específico (ej. "Adobe Photoshop" en lugar de "diseño").</li>
          <li>Añade las habilidades más relevantes según el trabajo al que aspiras.</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;
