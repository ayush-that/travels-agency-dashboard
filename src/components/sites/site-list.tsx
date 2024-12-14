import { Button } from "@/components/ui/button";

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
    <div className="space-y-3">
      {sites.map((site, index) => (
        <div
          key={index}
          className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-bold text-base sm:text-lg leading-tight">
                  {site.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>{site.location}</span>
                  <span>•</span>
                  <span>{site.duration}</span>
                  <span>•</span>
                  <span>{site.sector}</span>
                </div>
              </div>
              <div className="flex items-baseline whitespace-nowrap">
                <span className="text-primary text-lg font-bold">${site.price}</span>
                <span className="text-muted-foreground text-sm">/person</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm">{site.rating}</span>
              </div>
              <Button 
                variant="link" 
                className="text-primary p-0 h-auto text-sm font-normal hover:no-underline"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
