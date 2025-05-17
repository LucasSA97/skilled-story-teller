
import { useCVContext } from "@/context/CVContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Education } from "@/types";
import { X, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EducationItem = ({
  education,
  onUpdate,
  onRemove,
}: {
  education: Education;
  onUpdate: (id: string, data: Partial<Omit<Education, "id">>) => void;
  onRemove: (id: string) => void;
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onUpdate(education.id, { [name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    onUpdate(education.id, { current: checked });
    if (checked) {
      onUpdate(education.id, { endDate: "" });
    }
  };

  return (
    <Card className="relative mb-6">
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(education.id)}
      >
        <X size={18} />
      </Button>
      
      <CardContent className="pt-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor={`degree-${education.id}`}>Título/Grado*</Label>
            <Input
              id={`degree-${education.id}`}
              name="degree"
              value={education.degree}
              onChange={handleChange}
              placeholder="Ej. Ingeniería Informática"
              required
            />
          </div>
          
          <div>
            <Label htmlFor={`institution-${education.id}`}>Institución*</Label>
            <Input
              id={`institution-${education.id}`}
              name="institution"
              value={education.institution}
              onChange={handleChange}
              placeholder="Ej. Universidad Complutense de Madrid"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <Label htmlFor={`location-${education.id}`}>Ciudad/País*</Label>
          <Input
            id={`location-${education.id}`}
            name="location"
            value={education.location}
            onChange={handleChange}
            placeholder="Ej. Madrid, España"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor={`startDate-${education.id}`}>Fecha de Inicio*</Label>
            <Input
              id={`startDate-${education.id}`}
              name="startDate"
              type="date"
              value={education.startDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor={`endDate-${education.id}`}>
              Fecha de Finalización
              {education.current ? " (Actual)" : "*"}
            </Label>
            <Input
              id={`endDate-${education.id}`}
              name="endDate"
              type="date"
              value={education.endDate}
              onChange={handleChange}
              disabled={!!education.current}
              required={!education.current}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id={`current-${education.id}`}
            checked={!!education.current}
            onCheckedChange={handleCheckboxChange}
          />
          <Label
            htmlFor={`current-${education.id}`}
            className="font-normal cursor-pointer"
          >
            Cursando actualmente
          </Label>
        </div>
        
        <div>
          <Label htmlFor={`grade-${education.id}`}>Nota/Menciones (opcional)</Label>
          <Input
            id={`grade-${education.id}`}
            name="grade"
            value={education.grade || ""}
            onChange={handleChange}
            placeholder="Ej. 8.5/10, Cum Laude, etc."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const EducationForm = () => {
  const { cvState, addEducation, updateEducation, removeEducation } = useCVContext();
  const { education } = cvState.data;

  const handleAddEducation = () => {
    addEducation({
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="space-y-6">
      {education.length === 0 ? (
        <div className="text-center py-8 rounded-md bg-secondary/50">
          <p className="text-muted-foreground mb-4">No has agregado formación académica todavía.</p>
          <Button onClick={handleAddEducation}>
            <Plus size={16} className="mr-2" />
            Agregar Formación
          </Button>
        </div>
      ) : (
        <>
          {education.map((edu) => (
            <EducationItem
              key={edu.id}
              education={edu}
              onUpdate={updateEducation}
              onRemove={removeEducation}
            />
          ))}
          
          <Button 
            variant="outline" 
            onClick={handleAddEducation}
            className="w-full"
          >
            <Plus size={16} className="mr-2" />
            Agregar Otra Formación
          </Button>
        </>
      )}
    </div>
  );
};

export default EducationForm;
