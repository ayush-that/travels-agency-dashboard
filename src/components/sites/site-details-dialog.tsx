import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Site } from "@/types/site";
import Image from "next/image";
import { Clock, MapPin, Star, Users, Utensils, Info, Calendar, DollarSign } from "lucide-react";

interface SiteDetailsDialogProps {
  site: Site | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SiteDetailsDialog({ site, isOpen, onClose }: SiteDetailsDialogProps) {
  if (!site) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{site.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Hero Image */}
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={site.imageUrl}
              alt={site.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{site.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{site.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Utensils className="h-4 w-4" />
              <span>{site.sector}</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span>{site.rating} (128 reviews)</span>
            </div>
          </div>

          {/* Price and Booking */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-2xl font-bold">${site.price}</p>
              <p className="text-sm text-muted-foreground">per person</p>
            </div>
            <Button size="lg">
              Book Now
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About this place</h3>
            <p className="text-muted-foreground leading-relaxed">
              Experience the charm of {site.location} through this unique {site.sector.toLowerCase()} 
              experience. Located in the heart of the city, this {site.duration} adventure 
              offers an unforgettable journey through local culture and cuisine.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What's Included</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Professional guide</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Utensils className="h-4 w-4" />
                  <span>All meals included</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Safety equipment</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Important Info</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Available daily</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Start time: 9:00 AM</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Free cancellation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
