"use client";

import { Client } from "@/types/quote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClientFormProps {
  client: Client;
  onChange: (client: Client) => void;
}

export function ClientForm({ client, onChange }: ClientFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du Client</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Nom / Raison sociale</Label>
          <Input
            id="clientName"
            value={client.name}
            onChange={(e) => onChange({ ...client, name: e.target.value })}
            placeholder="Entreprise SAS"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientAddress">Adresse</Label>
          <Input
            id="clientAddress"
            value={client.address}
            onChange={(e) => onChange({ ...client, address: e.target.value })}
            placeholder="456 avenue Business, 75000 Paris"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientCompany">Forme juridique</Label>
          <Input
            id="clientCompany"
            value={client.company}
            onChange={(e) => onChange({ ...client, company: e.target.value })}
            placeholder="SAS au capital de 10000€"
          />
        </div>
      </CardContent>
    </Card>
  );
}