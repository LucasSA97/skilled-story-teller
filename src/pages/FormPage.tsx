
import { CVProvider } from "@/context/CVContext";
import FormWizard from "@/components/FormWizard";

const FormPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <CVProvider>
        <FormWizard />
      </CVProvider>
    </div>
  );
};

export default FormPage;
