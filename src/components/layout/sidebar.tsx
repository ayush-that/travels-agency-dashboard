import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Grid, Users, Plane, X } from "lucide-react";
import { Filters } from "@/types/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onResetFilters: () => void;
  onClose?: () => void;
}

export function Sidebar({
  filters,
  onFilterChange,
  onResetFilters,
  onClose,
}: SidebarProps) {
  const [collapsedSections, setCollapsedSections] = useState({
    location: false,
    price: false,
    duration: false,
    services: false,
  });

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const newLocations = checked
      ? [...filters.locations, location]
      : filters.locations.filter((l) => l !== location);

    onFilterChange({
      ...filters,
      locations: newLocations,
    });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      priceRange: {
        min: value[0],
        max: value[1] || value[0],
      },
    });
  };

  const handleDurationChange = (duration: string, checked: boolean) => {
    const newDurations = checked
      ? [...filters.durations, duration]
      : filters.durations.filter((d) => d !== duration);

    onFilterChange({
      ...filters,
      durations: newDurations,
    });
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    const newServices = checked
      ? [...filters.services, service]
      : filters.services.filter((s) => s !== service);

    onFilterChange({
      ...filters,
      services: newServices,
    });
  };

  return (
    <aside className="w-full lg:w-72 h-full bg-[#f9f9f9] border-r">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-16 px-4 flex items-center justify-between border-b">
          <div className="bg-primary p-2 rounded-full">
            <Plane className="w-6 h-6 text-white" />
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Main Content Section - with flex-1 to push bottom section down */}
        <div className="flex-1 overflow-y-auto">
          {/* Filters Section */}
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="link"
                  className="text-primary px-0"
                  onClick={onResetFilters}
                >
                  Reset All
                </Button>
              </div>
            </div>

            <div className="space-y-4 pb-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Location</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("location")}
                  className="h-8 w-8 p-0"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      collapsedSections.location ? "-rotate-90" : ""
                    }`}
                  />
                </Button>
              </div>
              {!collapsedSections.location && (
                <div className="space-y-2">
                  {["Dhaka", "Rangpur", "Cumilla", "Khulna"].map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={location}
                        checked={filters.locations.includes(location)}
                        onCheckedChange={(checked) =>
                          handleLocationChange(location, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={location}
                        className="text-sm text-muted-foreground data-[state=checked]:font-medium peer-data-[state=checked]:font-medium"
                      >
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Price</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("price")}
                  className="h-8 w-8 p-0"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      collapsedSections.price ? "-rotate-90" : ""
                    }`}
                  />
                </Button>
              </div>
              {!collapsedSections.price && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        value={filters.priceRange.min}
                        onChange={(e) => {
                          const value = Number(
                            e.target.value.replace(/\D/g, "")
                          );
                          onFilterChange({
                            ...filters,
                            priceRange: {
                              ...filters.priceRange,
                              min: value,
                            },
                          });
                        }}
                        className="pl-16 h-9 text-sm border-primary/20 focus:border-primary"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground text-sm">
                        From: $
                      </div>
                    </div>
                    <span className="text-muted-foreground">-</span>
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        value={filters.priceRange.max}
                        onChange={(e) => {
                          const value = Number(
                            e.target.value.replace(/\D/g, "")
                          );
                          onFilterChange({
                            ...filters,
                            priceRange: {
                              ...filters.priceRange,
                              max: value,
                            },
                          });
                        }}
                        className="pl-12 h-9 text-sm border-primary/20 focus:border-primary"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground text-sm">
                        To: $
                      </div>
                    </div>
                  </div>
                  <Slider
                    value={[filters.priceRange.min, filters.priceRange.max]}
                    min={0}
                    max={1000}
                    step={10}
                    className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:shadow-sm [&_.range-slider-track]:bg-primary/30"
                    onValueChange={(value) => {
                      onFilterChange({
                        ...filters,
                        priceRange: {
                          min: value[0],
                          max: value[1],
                        },
                      });
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4 pb-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Durations</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("duration")}
                  className="h-8 w-8 p-0"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      collapsedSections.duration ? "-rotate-90" : ""
                    }`}
                  />
                </Button>
              </div>
              {!collapsedSections.duration && (
                <div className="space-y-2">
                  {["1h", "2h", "3h", "4h"].map((duration) => (
                    <div key={duration} className="flex items-center space-x-2">
                      <Checkbox
                        id={duration}
                        checked={filters.durations.includes(duration)}
                        onCheckedChange={(checked) =>
                          handleDurationChange(duration, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={duration}
                        className="text-sm text-muted-foreground"
                      >
                        {duration}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Services</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("services")}
                  className="h-8 w-8 p-0"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      collapsedSections.services ? "-rotate-90" : ""
                    }`}
                  />
                </Button>
              </div>
              {!collapsedSections.services && (
                <div className="space-y-2">
                  {["Hotels", "Rent", "Tour", "Accommodation"].map(
                    (service) => (
                      <div
                        key={service}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={service}
                          checked={filters.services.includes(service)}
                          onCheckedChange={(checked) =>
                            handleServiceChange(service, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={service}
                          className="text-sm text-muted-foreground"
                        >
                          {service}
                        </label>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section - will stay at bottom */}
        <div className="border-t bg-white">
          <div className="p-4 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start h-10 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 relative group"
              onClick={(e) => e.preventDefault()}
            >
              <Grid className="mr-2 h-5 w-5" />
              Integrations
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-popover rounded shadow-sm text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Coming Soon
              </span>
            </Button>
            <div className="border-b pb-1 mb-1">
              <Button
                variant="ghost"
                className="w-full justify-start h-10 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 relative group"
                onClick={(e) => e.preventDefault()}
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-popover rounded shadow-sm text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Coming Soon
                </span>
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-10 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 group"
                >
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Travel Team's
                    </div>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:text-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m6 9 6 6 6-6"
                      />
                    </svg>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Team Settings</DropdownMenuItem>
                <DropdownMenuItem>View Team</DropdownMenuItem>
                <DropdownMenuItem>Add Member</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Switch Team</DropdownMenuItem>
                <DropdownMenuItem>Create Team</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </aside>
  );
}
