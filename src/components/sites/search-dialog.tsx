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
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchDialogProps {
  onSearch: (query: string) => void;
}

export function SearchDialog({ onSearch }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Find Menu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Menu</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search for menus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => onSearch(searchQuery)}>Search</Button>
          </div>
          {/* You can add search results here */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
