
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CVsHeaderProps {
  onSaveCurrent: () => void;
  onCreateNew: () => void;
  hasReachedLimit: boolean;
}

export const CVsHeader = ({
  onSaveCurrent,
  onCreateNew,
  hasReachedLimit
}: CVsHeaderProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold">{t('myCVsTitle')}</h1>
        <p className="text-muted-foreground">{t('manageCVs')}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={onSaveCurrent}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Save size={18} /> {t('saveCurrentCV')}
        </Button>
        <Button
          onClick={onCreateNew}
          className="flex items-center gap-2"
          disabled={hasReachedLimit}
        >
          <Plus size={18} /> {t('createNewCV')}
        </Button>
      </div>
    </div>
  );
};
