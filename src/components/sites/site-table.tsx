import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div className="relative rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] whitespace-nowrap">Title</TableHead>
              <TableHead className="whitespace-nowrap">Location</TableHead>
              <TableHead className="whitespace-nowrap">Duration</TableHead>
              <TableHead className="whitespace-nowrap">Rating</TableHead>
              <TableHead className="whitespace-nowrap">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((site, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium whitespace-nowrap">
                  {site.title}
                </TableCell>
                <TableCell className="whitespace-nowrap">{site.location}</TableCell>
                <TableCell className="whitespace-nowrap">{site.duration}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{site.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="font-semibold">${site.price}</span>
                  <span className="text-sm text-muted-foreground">/person</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
