"use client";

import { Button } from "@/components/ui/button";
import { SiteCard } from "./site-card";
import { SiteList } from "./site-list";
import { SiteTable } from "./site-table";
import { useState, useMemo, useEffect } from "react";
import { LayoutList, LayoutGrid, Table2, ArrowUpDown } from "lucide-react";
import { Site, Filters } from "@/types/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterDialog } from "./filter-dialog";
import { SearchDialog } from "./search-dialog";

type ViewType = "kanban" | "list" | "table";
type SortType = "price-asc" | "price-desc" | "rating-desc" | "duration-asc";

interface SiteGridProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const DEMO_SITES = [
  {
    title: "ELEVATE YOUR TASTE: TODAY'S SPECIAL",
    location: "Dhaka",
    duration: "3h",
    sector: "Hotels",
    rating: 4.8,
    price: 45,
    imageUrl: "/1.jpg",
  },
  {
    title: "DISCOVER TODAY'S DELICACIES",
    location: "Khulna",
    duration: "1h",
    sector: "Rent",
    rating: 4.8,
    price: 20.5,
    imageUrl: "/2.avif",
  },
  {
    title: "EXCLUSIVE CUISINE OFFERINGS",
    location: "Cumilla",
    duration: "3h",
    sector: "Tour",
    rating: 4.8,
    price: 50,
    imageUrl: "/3.avif",
  },
  {
    title: "A FEAST FOR YOUR SENSES",
    location: "Tangail",
    duration: "1h",
    sector: "Localized Best",
    rating: 4.8,
    price: 25,
    imageUrl: "/4.avif",
  },
  {
    title: "TODAY'S GOURMET SELECTION",
    location: "Rangpur",
    duration: "2h",
    sector: "Hotels",
    rating: 4.8,
    price: 30,
    imageUrl: "/5.avif",
  },
  {
    title: "INDULGE IN CHEF'S SPECIALS",
    location: "Cox's",
    duration: "2h",
    sector: "Tour",
    rating: 4.8,
    price: 35,
    imageUrl: "/6.jpg",
  },
];

export function SiteGrid({ filters, onFilterChange }: SiteGridProps) {
  const [view, setView] = useState<ViewType>("kanban");
  const [sortBy, setSortBy] = useState<SortType>("rating-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("Location");

  useEffect(() => {
    const handleNavChange = (e: CustomEvent) => {
      setSelectedSection(e.detail);
    };

    window.addEventListener("navigationChange" as any, handleNavChange);
    return () =>
      window.removeEventListener("navigationChange" as any, handleNavChange);
  }, []);

  const filteredSites = useMemo(() => {
    let sites = DEMO_SITES.filter((site) => {
      // Search filter
      if (
        searchQuery &&
        !site.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Other filters remain the same
      if (
        filters.locations.length > 0 &&
        !filters.locations.includes(site.location)
      ) {
        return false;
      }
      if (
        site.price < filters.priceRange.min ||
        site.price > filters.priceRange.max
      ) {
        return false;
      }
      if (
        filters.durations.length > 0 &&
        !filters.durations.includes(site.duration)
      ) {
        return false;
      }
      if (
        filters.services.length > 0 &&
        !filters.services.includes(site.sector)
      ) {
        return false;
      }
      return true;
    });

    // Sort the filtered sites
    return sites.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        case "duration-asc":
          return a.duration.localeCompare(b.duration);
        default:
          return 0;
      }
    });
  }, [filters, sortBy, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h2 className="text-xl font-semibold">Sites</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("list")}
              className="flex items-center gap-2"
            >
              <LayoutList className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant={view === "kanban" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("kanban")}
              className="flex items-center gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Kanban</span>
            </Button>
            <Button
              variant={view === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("table")}
              className="flex items-center gap-2"
            >
              <Table2 className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden sm:inline">Sort By</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("price-asc")}>
                Price (Low to High)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("price-desc")}>
                Price (High to Low)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating-desc")}>
                Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("duration-asc")}>
                Duration
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <FilterDialog filters={filters} onFilterChange={onFilterChange} />
          
          <div className="h-6 w-px bg-border" />
          
          <SearchDialog onSearch={handleSearch} />
        </div>
      </div>

      <div className="border-b" />

      {selectedSection !== "Location" ? (
        <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Coming Soon</h2>
            <p className="text-gray-500">This section is under development</p>
          </div>
        </div>
      ) : (
        <>
          {view === "kanban" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSites.map((site, index) => (
                <SiteCard key={index} {...site} />
              ))}
            </div>
          )}
          {view === "list" && <SiteList sites={filteredSites} />}
          {view === "table" && (
            <div className="overflow-x-auto">
              <SiteTable sites={filteredSites} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
