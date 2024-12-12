"use client";

import { Service } from "@/types/quote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, PackagePlus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { frontendServices } from "@/lib/data/predefined-services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServicesFormProps {
  services: Service[];
  hourlyRate: number;
  onServicesChange: (services: Service[]) => void;
  onHourlyRateChange: (rate: number) => void;
}

export function ServicesForm({
  services,
  hourlyRate,
  onServicesChange,
  onHourlyRateChange,
}: ServicesFormProps) {
  const addService = () => {
    onServicesChange([
      ...services,
      { id: uuidv4(), description: "", hours: 0 },
    ]);
  };

  const addPredefinedService = (serviceId: string) => {
    const predefined = frontendServices.find((s) => s.id === serviceId);
    if (predefined) {
      onServicesChange([
        ...services,
        {
          id: uuidv4(),
          description: `${predefined.title}\n${predefined.description}`,
          hours: predefined.defaultHours,
        },
      ]);
    }
  };

  const removeService = (id: string) => {
    onServicesChange(services.filter((service) => service.id !== id));
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    onServicesChange(
      services.map((service) =>
        service.id === id ? { ...service, ...updates } : service
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prestations et Taux Horaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Taux horaire (€/h)</label>
          <Input
            type="number"
            value={hourlyRate}
            onChange={(e) => onHourlyRateChange(Number(e.target.value))}
            min="0"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Ajouter une prestation prédéfinie</label>
          <div className="flex gap-2">
            <Select onValueChange={addPredefinedService}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une prestation" />
              </SelectTrigger>
              <SelectContent>
                {frontendServices.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addService} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="flex gap-4">
              <textarea
                className="flex-grow min-h-[100px] p-2 rounded-md border"
                placeholder="Description de la prestation"
                value={service.description}
                onChange={(e) =>
                  updateService(service.id, { description: e.target.value })
                }
              />
              <div className="flex flex-col gap-2">
                <Input
                  type="number"
                  placeholder="Heures"
                  value={service.hours}
                  onChange={(e) =>
                    updateService(service.id, { hours: Number(e.target.value) })
                  }
                  min="0"
                  step="0.5"
                  className="w-24"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeService(service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}