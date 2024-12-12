import { Quote, Service } from "@/types/quote";

export const calculateSubtotal = (services: Service[], hourlyRate: number): number => {
  return services.reduce((total, service) => total + service.hours * hourlyRate, 0);
};

export const calculateTotal = (quote: Quote): number => {
  const subtotal = calculateSubtotal(quote.services, quote.hourlyRate);
  return quote.vatExempt ? subtotal : subtotal * 1.2; // 20% TVA
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export const generateQuoteNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `D${year}${month}-${random}`;
};