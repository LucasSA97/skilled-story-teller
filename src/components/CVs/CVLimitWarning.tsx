
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export const CVLimitWarning = () => {
  const { t } = useLanguage();

  return (
    <Card className="mb-6 bg-yellow-50 border-yellow-200">
      <CardContent className="pt-4">
        <p className="text-yellow-800">
          {t('limitReached')}
        </p>
      </CardContent>
    </Card>
  );
};
