"use client";

import { Quote } from "@/types/quote";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
// import { generatePDF } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PdfExportProps {
  quote: Quote;
  targetRef: React.RefObject<HTMLDivElement>;
}

export function PdfExport({ quote, targetRef }: PdfExportProps) {
  const handleExport = async () => {
    if (!targetRef.current) return;

    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 150; // Largeur de l'image
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcul de la hauteur proportionnelle

      const pageWidth = 210; // Largeur de la page A4
      const pageHeight = 297; // Hauteur de la page A4

      // Calcul des marges pour centrer l'image
      const marginX = (pageWidth - imgWidth) / 2;
      const marginY = (pageHeight - imgHeight) / 2;

      // Ajouter l'image centrée
      pdf.addImage(imgData, "JPEG", marginX, marginY, imgWidth, imgHeight);

      // Sauvegarder le fichier PDF
      pdf.save(`devis-${quote.number}.pdf`);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
    }
  };

  return (
    <Button className="w-full" size="lg" onClick={handleExport}>
      <FileDown className="mr-2 h-4 w-4" />
      Exporter en PDF
    </Button>
  );
}
