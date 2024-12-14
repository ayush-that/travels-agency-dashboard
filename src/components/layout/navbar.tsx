import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const navItems = [
  { label: "Location", isActive: true, showComingSoon: false },
  { label: "Accommodation", isActive: false, showComingSoon: true },
  { label: "Rent", isActive: false, showComingSoon: true },
  { label: "Tour", isActive: false, showComingSoon: true },
];

export function Navbar() {
  const [activeItem, setActiveItem] = useState("Location");
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  const handleNavClick = (label: string, showComingSoon: boolean) => {
    setActiveItem(label);
    const event = new CustomEvent("navigationChange", { detail: label });
    window.dispatchEvent(event);
  };

  const handleHelpCenterClick = () => {
    setShowHelpCenter(true);
    const event = new CustomEvent("navigationChange", { detail: "HelpCenter" });
    window.dispatchEvent(event);
  };

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`px-6 font-medium ${
                item.label === activeItem
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "border border-muted-foreground/20 text-muted-foreground hover:bg-background"
              }`}
              onClick={() => handleNavClick(item.label, item.showComingSoon)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-muted-foreground font-normal"
            onClick={handleHelpCenterClick}
          >
            <HelpCircle className="w-4 h-4" />
            Help Center
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="space-x-2">
                <div className="flex items-center gap-2">
                  <img
                    src="https://pbs.twimg.com/profile_images/1778114777765781508/YHoPRDtT_400x400.jpg"
                    alt="Ayush's profile picture"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>Ayush</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Bookings</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
