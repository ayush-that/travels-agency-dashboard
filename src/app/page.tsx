"use client";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { SiteGrid } from "@/components/sites/site-grid";
import { useState } from "react";
import { Filters } from "@/types/site";
import { Button } from "@/components/ui/button";
import { Filter, Plane } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const DEFAULT_FILTERS: Filters = {
  locations: [],
  priceRange: {
    min: 0,
    max: 1000,
  },
  durations: [],
  services: [],
};

export default function Home() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Sidebar */}
        <div className={`hidden lg:block transition-all duration-300 ${isSidebarCollapsed ? 'lg:w-16' : 'lg:w-72'}`}>
          <Sidebar
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={() => setFilters(DEFAULT_FILTERS)}
            isCollapsed={isSidebarCollapsed}
            onCollapse={setIsSidebarCollapsed}
          />
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden sticky top-0 z-50 bg-background border-b">
          <div className="p-4 flex items-center justify-between">
            <Button 
              variant="outline"
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <div className="bg-primary p-2 rounded-md">
              <Plane className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Mobile Filter Sheet */}
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetContent side="left" className="w-full sm:w-[340px] p-0" hideCloseButton>
            <Sidebar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={() => setFilters(DEFAULT_FILTERS)}
              onClose={() => setIsMobileFilterOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <div className="flex-1 flex flex-col w-full">
          <div className="hidden lg:block">
            <Navbar />
          </div>
          <main className="flex-1 p-4 lg:p-6">
            <SiteGrid filters={filters} onFilterChange={setFilters} />
          </main>
        </div>
      </div>
    </div>
  );
}
