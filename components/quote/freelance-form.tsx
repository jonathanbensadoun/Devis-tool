"use client";

import { Freelance } from "@/types/quote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FreelanceFormProps {
  freelance: Freelance;
  onChange: (freelance: Freelance) => void;
}

export function FreelanceForm({ freelance, onChange }: FreelanceFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du Freelance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            value={freelance.name}
            onChange={(e) => onChange({ ...freelance, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            value={freelance.address}
            onChange={(e) => onChange({ ...freelance, address: e.target.value })}
            placeholder="123 rue Example, 75000 Paris"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="siret">Numéro SIRET</Label>
          <Input
            id="siret"
            value={freelance.siret}
            onChange={(e) => onChange({ ...freelance, siret: e.target.value })}
            placeholder="123 456 789 00012"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vatNumber">Numéro de TVA</Label>
          <Input
            id="vatNumber"
            value={freelance.vatNumber}
            onChange={(e) => onChange({ ...freelance, vatNumber: e.target.value })}
            placeholder="FR 12 345678901"
          />
        </div>
      </CardContent>
    </Card>
  );
}