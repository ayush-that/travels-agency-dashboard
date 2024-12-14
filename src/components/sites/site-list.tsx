import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SiteListProps {
  sites: Array<{
    title: string;
    location: string;
    duration: string;
    sector: string;
    rating: number;
    price: number;
    imageUrl: string;
  }>;
}

export function SiteList({ sites }: SiteListProps) {
  return (
    <div className="space-y-4">
      {sites.map((site, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:shadow-lg transition-all duration-200"
        >
          <div className="relative w-48 h-32">
            <Image
              src={site.imageUrl}
              alt={site.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">{site.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <span>
                {site.location} • {site.duration} • {site.sector}
              </span>
            </div>
            <div className="flex items-center mb-2">
              {"★★★★☆".split("").map((star, i) => (
                <span key={i} className="text-yellow-400">
                  {star}
                </span>
              ))}
              <span className="ml-2">{site.rating}</span>
            </div>
            <div className="text-lg font-semibold text-primary">
              ${site.price}{" "}
              <span className="text-sm text-muted-foreground">/person</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
