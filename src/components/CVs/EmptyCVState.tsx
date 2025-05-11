
import React from "react";
import { FileText, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface EmptyCVStateProps {
  onCreateNew: () => void;
}

export const EmptyCVState = ({ onCreateNew }: EmptyCVStateProps) => {
  const { t } = useLanguage();

  return (
    <Card className="text-center py-12">
      <CardContent>
        <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">{t('noCVs')}</h3>
        <p className="text-muted-foreground mb-4">{t('createFirstCV')}</p>
        <Button onClick={onCreateNew}>
          <Plus size={16} className="mr-2" /> {t('createMyFirstCV')}
        </Button>
      </CardContent>
    </Card>
  );
};
