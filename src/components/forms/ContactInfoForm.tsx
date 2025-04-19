
import { useCVContext } from "@/context/CVContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ContactInfoForm = () => {
  const { cvState, updateContactInfo } = useCVContext();
  const { contactInfo } = cvState.data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateContactInfo({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email">Correo Electrónico*</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={contactInfo.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Teléfono*</Label>
          <Input
            id="phone"
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            placeholder="+34 612 345 678"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Dirección*</Label>
        <Input
          id="address"
          name="address"
          value={contactInfo.address}
          onChange={handleChange}
          placeholder="Calle, Ciudad, Código Postal, País"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="website">Sitio Web (opcional)</Label>
          <Input
            id="website"
            name="website"
            value={contactInfo.website || ""}
            onChange={handleChange}
            placeholder="www.ejemplo.com"
          />
        </div>
        
        <div>
          <Label htmlFor="linkedin">LinkedIn (opcional)</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={contactInfo.linkedin || ""}
            onChange={handleChange}
            placeholder="linkedin.com/in/usuario"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="github">GitHub (opcional)</Label>
        <Input
          id="github"
          name="github"
          value={contactInfo.github || ""}
          onChange={handleChange}
          placeholder="github.com/usuario"
        />
      </div>
    </div>
  );
};

export default ContactInfoForm;
