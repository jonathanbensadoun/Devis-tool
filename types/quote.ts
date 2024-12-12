export interface Freelance {
  name: string;
  address: string;
  siret: string;
  vatNumber: string;
}

export interface Client {
  name: string;
  address: string;
  company: string;
}

export interface Service {
  id: string;
  description: string;
  hours: number;
}

export interface Quote {
  number: string;
  date: string;
  freelance: Freelance;
  client: Client;
  services: Service[];
  hourlyRate: number;
  vatExempt: boolean;
}