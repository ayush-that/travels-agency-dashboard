"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Filters } from "@/types/site";

interface FilterDialogProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function FilterDialog({ filters, onFilterChange }: FilterDialogProps) {
  const locations = ["Dhaka", "Rangpur", "Cumilla", "Khulna"];
  const durations = ["1h", "2h", "3h", "4h"];
  const services = ["Hotels", "Rent", "Tour", "Accommodation"];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <Label>Price</Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={filters.priceRange.min}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    priceRange: {
                      ...filters.priceRange,
                      min: Number(e.target.value),
                    },
                  })
                }
                placeholder="Min price"
              />
              <Input
                type="number"
                value={filters.priceRange.max}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    priceRange: {
                      ...filters.priceRange,
                      max: Number(e.target.value),
                    },
                  })
                }
                placeholder="Max price"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Locations</Label>
            <div className="grid grid-cols-2 gap-2">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={filters.locations.includes(location)}
                    onCheckedChange={(checked) => {
                      const newLocations = checked
                        ? [...filters.locations, location]
                        : filters.locations.filter((l) => l !== location);
                      onFilterChange({ ...filters, locations: newLocations });
                    }}
                  />
                  <label htmlFor={location}>{location}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Duration</Label>
            <div className="grid grid-cols-2 gap-2">
              {durations.map((duration) => (
                <div key={duration} className="flex items-center space-x-2">
                  <Checkbox
                    id={duration}
                    checked={filters.durations.includes(duration)}
                    onCheckedChange={(checked) => {
                      const newDurations = checked
                        ? [...filters.durations, duration]
                        : filters.durations.filter((d) => d !== duration);
                      onFilterChange({ ...filters, durations: newDurations });
                    }}
                  />
                  <label htmlFor={duration}>{duration}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Services</Label>
            <div className="grid grid-cols-2 gap-2">
              {services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={filters.services.includes(service)}
                    onCheckedChange={(checked) => {
                      const newServices = checked
                        ? [...filters.services, service]
                        : filters.services.filter((s) => s !== service);
                      onFilterChange({ ...filters, services: newServices });
                    }}
                  />
                  <label htmlFor={service}>{service}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
