
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
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{t('myCVsTitle')}</h1>
        <p className="text-muted-foreground">{t('manageCVs')}</p>
      </div>
      <div className="flex gap-2 space-x-2">
        <Button
          onClick={onSaveCurrent}
          className="flex items-center gap-2"
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
