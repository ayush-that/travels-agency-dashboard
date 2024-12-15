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
              <TableHead className="w-[200px] whitespace-nowrap py-4">Title</TableHead>
              <TableHead className="whitespace-nowrap py-4">Location</TableHead>
              <TableHead className="whitespace-nowrap py-4">Duration</TableHead>
              <TableHead className="whitespace-nowrap py-4">Rating</TableHead>
              <TableHead className="whitespace-nowrap py-4">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((site, index) => (
              <TableRow 
                key={index} 
                className="transition-colors duration-200 hover:cursor-pointer hover:bg-primary/5 border-b"
              >
                <TableCell className="font-medium whitespace-nowrap py-4">
                  {site.title}
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">{site.location}</TableCell>
                <TableCell className="whitespace-nowrap py-4">{site.duration}</TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    <span>{site.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-4">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">${site.price}</span>
                    <span className="text-sm text-muted-foreground">/person</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
