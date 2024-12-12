"use client";

import { Quote } from "@/types/quote";
import { Card } from "@/components/ui/card";
import { calculateSubtotal, calculateTotal, formatCurrency } from "@/lib/utils/quote";

interface QuotePreviewProps {
  quote: Quote;
}

export default function QuotePreview({ quote }: QuotePreviewProps) {
  const subtotal = calculateSubtotal(quote.services, quote.hourlyRate);
  const total = calculateTotal(quote);

  return (
    <Card className="p-8 bg-white print:shadow-none">
      <div className="space-y-8">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">DEVIS</h2>
            <p className="text-sm text-gray-600">N° {quote.number}</p>
            <p className="text-sm text-gray-600">Date: {quote.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Émetteur</h3>
            <div className="text-sm space-y-1">
              <p>{quote.freelance.name}</p>
              <p style={{ whiteSpace: 'pre-line' }}>{quote.freelance.address}</p>
              <p>SIRET: {quote.freelance.siret}</p>
              <p>N° TVA: {quote.freelance.vatNumber}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Client</h3>
            <div className="text-sm space-y-1">
              <p>{quote.client.name}</p>
              <p style={{ whiteSpace: 'pre-line' }}>{quote.client.address}</p>
              <p>{quote.client.company}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Prestations</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Description</th>
                <th className="pb-2">Heures</th>
                <th className="pb-2 text-right">Total HT</th>
              </tr>
            </thead>
            <tbody>
              {quote.services.map((service) => (
                <tr key={service.id} className="border-b">
                  <td className="py-2">
                    <div style={{ whiteSpace: 'pre-line' }}>{service.description}</div>
                  </td>
                  <td className="py-2">{service.hours}h</td>
                  <td className="py-2 text-right">
                    {formatCurrency(service.hours * quote.hourlyRate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total HT</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {!quote.vatExempt && (
            <div className="flex justify-between">
              <span>TVA (20%)</span>
              <span>{formatCurrency(total - subtotal)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span>Total {quote.vatExempt ? "HT" : "TTC"}</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {quote.vatExempt && (
            <p>TVA non applicable, article 293 B du CGI.</p>
          )}
        </div>
      </div>
    </Card>
  );
}