import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { SiteDetailsDialog } from "./site-details-dialog"
import { Site } from "@/types/site"

interface SiteCardProps extends Site {}

export function SiteCard(props: SiteCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div 
        className="rounded-xl border bg-card overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:cursor-pointer hover:border-primary hover:bg-primary/5 shadow-md"
        onClick={() => setShowDetails(true)}
      >
        <div className="aspect-[4/3] relative">
          <Image
            src={props.imageUrl}
            alt={props.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 truncate">{props.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground/80 mb-2">
            <span className="truncate">{props.location} • {props.duration} • {props.sector}</span>
          </div>
          <div className="flex items-center mb-4">
            {'★★★★★'.split('').map((star, i) => (
              <span key={i} className="text-yellow-400">{star}</span>
            ))}
            <span className="ml-2 text-sm">{props.rating}</span>
          </div>
          <div className="text-xl font-bold text-primary">
            ${props.price} <span className="text-sm font-normal text-muted-foreground">/person</span>
          </div>
        </div>
      </div>

      <SiteDetailsDialog
        site={props}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  )
} 