
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TemplateType } from "@/types";

interface SavedCV {
  id: string;
  name: string;
  template: TemplateType;
  created_at: string;
  updated_at: string;
}

interface CVsListProps {
  savedCVs: SavedCV[];
  onViewCV: (id: string) => void;
  onEditCV: (id: string) => void;
  onDeleteCV: (id: string) => void;
}

export const CVsList = ({
  savedCVs,
  onViewCV,
  onEditCV,
  onDeleteCV
}: CVsListProps) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('savedCVs')}</CardTitle>
        <CardDescription>
          {t('youHave')} {savedCVs.length} {savedCVs.length === 1 ? t('cv') : t('cvs')} {t('saved')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('template')}</TableHead>
              <TableHead>{t('lastUpdate')}</TableHead>
              <TableHead className="text-right">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savedCVs.map((cv) => (
              <TableRow key={cv.id}>
                <TableCell className="font-medium">{cv.name}</TableCell>
                <TableCell className="capitalize">{cv.template}</TableCell>
                <TableCell>{new Date(cv.updated_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => onViewCV(cv.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => onEditCV(cv.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => onDeleteCV(cv.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
