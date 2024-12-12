"use client";

import { useState, useRef } from "react";
import { Quote, Service } from "@/types/quote";
import { FreelanceForm } from "@/components/quote/freelance-form";
import { ClientForm } from "@/components/quote/client-form";
import { ServicesForm } from "@/components/quote/services-form";
import { PdfExport } from "@/components/quote/pdf-export";
import { generateQuoteNumber } from "@/lib/utils/quote";
import dynamic from "next/dynamic";

const QuotePreview = dynamic(() => import("@/components/quote/quote-preview"), {
  ssr: false,
});

const DateForm = ({
  date,
  onChange,
}: {
  date: string;
  onChange: (date: string) => void;
}) => {
  const formatDateForInput = (date: string) => {
    const [day, month, year] = date.split("/"); // Format DD/MM/YYYY
    return `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
  };

  const formatDateForLocale = (date: string) => {
    const [year, month, day] = date.split("-"); // Format YYYY-MM-DD
    return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Date</label>
      <input
        type="date"
        value={formatDateForInput(date)} // Format adapté pour l'input
        onChange={
          (e) => onChange(formatDateForLocale(e.target.value)) // Convertit en DD/MM/YYYY
        }
        className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default function Home() {
  const [quote, setQuote] = useState<Quote>({
    number: generateQuoteNumber(),
    date: new Date().toLocaleDateString("fr-FR"), // Format YYYY-MM-DD
    freelance: {
      name: "",
      address: "",
      siret: "",
      vatNumber: "",
    },
    client: {
      name: "",
      address: "",
      company: "",
    },
    services: [],
    hourlyRate: 0,
    vatExempt: true,
  });

  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Générateur de Devis Freelance
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <DateForm
            date={quote.date}
            onChange={(date) => setQuote({ ...quote, date })}
          />
          <FreelanceForm
            freelance={quote.freelance}
            onChange={(freelance) => setQuote({ ...quote, freelance })}
          />
          <ClientForm
            client={quote.client}
            onChange={(client) => setQuote({ ...quote, client })}
          />
          <ServicesForm
            services={quote.services}
            hourlyRate={quote.hourlyRate}
            onServicesChange={(services) => setQuote({ ...quote, services })}
            onHourlyRateChange={(hourlyRate) =>
              setQuote({ ...quote, hourlyRate })
            }
          />
        </div>

        <div className="space-y-4">
          <div ref={previewRef}>
            <QuotePreview quote={quote} />
          </div>
          <PdfExport quote={quote} targetRef={previewRef} />
        </div>
      </div>
    </main>
  );
}
