
import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { LanguageProficiency } from "@/types";

const proficiencyLevels: LanguageProficiency[] = [
  "Básico",
  "Intermedio",
  "Avanzado",
  "Nativo"
];

const LanguagesForm = () => {
  const { cvState, addLanguage, removeLanguage, updateLanguage } = useCVContext();
  const { languages } = cvState.data;
  
  const [newLanguage, setNewLanguage] = useState("");
  const [newLevel, setNewLevel] = useState<LanguageProficiency>("Intermedio");

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      addLanguage({
        name: newLanguage.trim(),
        level: newLevel
      });
      setNewLanguage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLanguage();
    }
  };

  const updateLevel = (languageId: string, level: LanguageProficiency) => {
    updateLanguage(languageId, { level });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        <div className="md:col-span-2">
          <Label htmlFor="newLanguage">Idioma</Label>
          <Input
            id="newLanguage"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ej. Inglés, Español, Francés..."
          />
        </div>
        
        <div>
          <Label htmlFor="newLevel">Nivel</Label>
          <Select
            value={newLevel}
            onValueChange={(value) => setNewLevel(value as LanguageProficiency)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona nivel" />
            </SelectTrigger>
            <SelectContent>
              {proficiencyLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-3">
          <Button onClick={handleAddLanguage} className="w-full">
            Añadir Idioma
          </Button>
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Idiomas</Label>
        
        {languages.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-md">
            <p className="text-gray-500">Añade los idiomas que conoces</p>
          </div>
        ) : (
          <div className="space-y-3">
            {languages.map((language) => (
              <div
                key={language.id}
                className="flex items-center justify-between bg-gray-50 rounded-md p-3"
              >
                <span className="font-medium">{language.name}</span>
                
                <div className="flex items-center gap-2">
                  <Select
                    value={language.level}
                    onValueChange={(value) => 
                      updateLevel(language.id, value as LanguageProficiency)
                    }
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                    onClick={() => removeLanguage(language.id)}
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguagesForm;
