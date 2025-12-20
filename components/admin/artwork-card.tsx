"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { deleteArtwork } from "@/lib/actions";
import type { Database } from "@/lib/database.types";

type Artwork = Database["public"]["Tables"]["artworks"]["Row"];

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start">
          <div className="relative w-80 h-80 lg:w-100 lg:h-100 shrink-0">
            <Image
              src={artwork.url}
              alt={artwork.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <h3 className="font-semibold truncate">{artwork.title}</h3>
            <p className="text-sm text-muted-foreground">{artwork.category}</p>
            <p className="text-sm text-muted-foreground">SKU: {artwork.sku}</p>
            {artwork.year && (
              <p className="text-sm text-muted-foreground">
                Year: {artwork.year}
              </p>
            )}
            {artwork.dimensions && (
              <p className="text-sm text-muted-foreground">
                Dimensions: {artwork.dimensions}
              </p>
            )}
            {artwork.materials && (
              <p className="text-sm text-muted-foreground">
                Materials: {artwork.materials}
              </p>
            )}
            {artwork.price && <p className="font-medium">${artwork.price}</p>}
            {artwork.description && (
              <p className="text-sm mt-2">{artwork.description}</p>
            )}
          </div>
          <div className="flex gap-2 justify-center lg:justify-start">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/artworks/${artwork.id}/edit`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <form action={deleteArtwork.bind(null, artwork.id)}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={(e) => {
                  if (
                    !confirm("Are you sure you want to delete this artwork?")
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
