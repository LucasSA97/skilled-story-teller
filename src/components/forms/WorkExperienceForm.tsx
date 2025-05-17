
import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { WorkExperience } from "@/types";
import { X, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ExperienceItem = ({
  experience,
  onUpdate,
  onRemove,
}: {
  experience: WorkExperience;
  onUpdate: (id: string, data: Partial<Omit<WorkExperience, "id">>) => void;
  onRemove: (id: string) => void;
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onUpdate(experience.id, { [name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    onUpdate(experience.id, { current: checked });
    if (checked) {
      onUpdate(experience.id, { endDate: "" });
    }
  };

  return (
    <Card className=" relative mb-6">
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(experience.id)}
      >
        <X size={18} />
      </Button>
      
      <CardContent className="pt-6 pb-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor={`position-${experience.id}`}>Puesto*</Label>
            <Input
              id={`position-${experience.id}`}
              name="position"
              value={experience.position}
              onChange={handleChange}
              placeholder="Ej. Desarrollador Full Stack"
              required
            />
          </div>
          
          <div>
            <Label htmlFor={`company-${experience.id}`}>Empresa*</Label>
            <Input
              id={`company-${experience.id}`}
              name="company"
              value={experience.company}
              onChange={handleChange}
              placeholder="Ej. Empresa S.L."
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <Label htmlFor={`location-${experience.id}`}>Ciudad/País*</Label>
          <Input
            id={`location-${experience.id}`}
            name="location"
            value={experience.location}
            onChange={handleChange}
            placeholder="Ej. Madrid, España"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor={`startDate-${experience.id}`}>Fecha de Inicio*</Label>
            <Input
              id={`startDate-${experience.id}`}
              name="startDate"
              type="date"
              value={experience.startDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor={`endDate-${experience.id}`}>
              Fecha de Finalización
              {experience.current ? " (Actual)" : "*"}
            </Label>
            <Input
              id={`endDate-${experience.id}`}
              name="endDate"
              type="date"
              value={experience.endDate}
              onChange={handleChange}
              disabled={!!experience.current}
              required={!experience.current}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id={`current-${experience.id}`}
            checked={!!experience.current}
            onCheckedChange={handleCheckboxChange}
          />
          <Label
            htmlFor={`current-${experience.id}`}
            className="font-normal cursor-pointer"
          >
            Trabajo actual
          </Label>
        </div>
        
        <div>
          <Label htmlFor={`description-${experience.id}`}>Descripción*</Label>
          <Textarea
            id={`description-${experience.id}`}
            name="description"
            value={experience.description}
            onChange={handleChange}
            placeholder="Describe tus responsabilidades y logros en este puesto..."
            className="min-h-[120px]"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

const WorkExperienceForm = () => {
  const { cvState, addWorkExperience, updateWorkExperience, removeWorkExperience } = useCVContext();
  const { workExperience } = cvState.data;

  const handleAddExperience = () => {
    addWorkExperience({
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <div className="space-y-6">
      {workExperience.length === 0 ? (
        <div className="text-center py-8 bg-secondary/50 rounded-md">
          <p className="text-muted-foreground mb-4">No has agregado experiencia laboral todavía.</p>
          <Button onClick={handleAddExperience}>
            <Plus size={16} className="mr-2" />
            Agregar Experiencia
          </Button>
        </div>
      ) : (
        <>
          {workExperience.map((exp) => (
            <ExperienceItem
              key={exp.id}
              experience={exp}
              onUpdate={updateWorkExperience}
              onRemove={removeWorkExperience}
            />
          ))}
          
          <Button 
            variant="outline" 
            onClick={handleAddExperience}
            className="w-full"
          >
            <Plus size={16} className="mr-2" />
            Agregar Otra Experiencia
          </Button>
        </>
      )}
    </div>
  );
};

export default WorkExperienceForm;
