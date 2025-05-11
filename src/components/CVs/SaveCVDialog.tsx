
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface SaveCVDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cvName: string;
  onCVNameChange: (name: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export const SaveCVDialog = ({
  open,
  onOpenChange,
  cvName,
  onCVNameChange,
  onSave,
  isSaving
}: SaveCVDialogProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('saveCVTitle')}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="cv-name">{t('cvName')}</Label>
          <Input
            id="cv-name"
            value={cvName}
            onChange={(e) => onCVNameChange(e.target.value)}
            placeholder={t('cvNamePlaceholder')}
            className="mt-2"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={onSave} disabled={isSaving}>
            {isSaving ? t('saving') : t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
