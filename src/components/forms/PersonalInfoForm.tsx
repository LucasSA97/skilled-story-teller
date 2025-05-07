
import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const PersonalInfoForm = () => {
  const { cvState, updatePersonalInfo } = useCVContext();
  const { personalInfo } = cvState.data;
  
  const [photo, setPhoto] = useState<string | null>(personalInfo.photo || null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const photoUrl = event.target.result as string;
          setPhoto(photoUrl);
          updatePersonalInfo({ photo: photoUrl });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Nombre Completo*</Label>
          <Input
            id="fullName"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder="Ej. Juan Pérez"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="nationality">Nacionalidad*</Label>
          <Input
            id="nationality"
            name="nationality"
            value={personalInfo.nationality}
            onChange={handleChange}
            placeholder="Ej. Española"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="birthDate">Fecha de Nacimiento*</Label>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          value={personalInfo.birthDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="photo">Foto (opcional)</Label>
        <div className="flex items-start gap-4 mt-2">
          <div>
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <label
              htmlFor="photo"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:bg-accent"
            >
              Seleccionar Imagen
            </label>
          </div>
          
          {photo && (
            <Card className="overflow-hidden w-24 h-24 flex items-center justify-center border border-border">
              <img
                src={photo}
                alt="Foto de perfil"
                className="object-cover w-full h-full"
              />
            </Card>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Recomendado: Imagen cuadrada, máximo 1MB
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
