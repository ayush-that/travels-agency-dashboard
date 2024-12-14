import { Button } from "@/components/ui/button";

interface SiteTableProps {
  sites: Array<{
    title: string;
    location: string;
    duration: string;
    sector: string;
    rating: number;
    price: number;
    morePoints?: number;
    imageUrl: string;
  }>;
}

export function SiteTable({ sites }: SiteTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-4 font-medium">Title</th>
            <th className="text-left p-4 font-medium">Location</th>
            <th className="text-left p-4 font-medium">Duration</th>
            <th className="text-left p-4 font-medium">Rating</th>
            <th className="text-left p-4 font-medium">Price</th>
            <th className="text-left p-4 font-medium">Points</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site, index) => (
            <tr
              key={index}
              className="border-t hover:bg-muted/50 transition-colors"
            >
              <td className="p-4">{site.title}</td>
              <td className="p-4">{site.location}</td>
              <td className="p-4">{site.duration}</td>
              <td className="p-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{site.rating}</span>
                </div>
              </td>
              <td className="p-4">
                <span className="font-semibold">${site.price}</span>
                <span className="text-sm text-muted-foreground">/person</span>
              </td>
              <td className="p-4">
                {site.morePoints && (
                  <Button variant="link" className="text-primary p-0">
                    {site.morePoints}+ points
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
