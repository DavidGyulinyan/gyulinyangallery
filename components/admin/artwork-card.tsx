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
        <div className="flex gap-4">
          <div className="relative w-24 h-24 shrink-0">
            <Image
              src={artwork.url}
              alt={artwork.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{artwork.title}</h3>
            <p className="text-sm text-muted-foreground">{artwork.category}</p>
            {artwork.year && (
              <p className="text-sm text-muted-foreground">{artwork.year}</p>
            )}
            {artwork.price && <p className="font-medium">${artwork.price}</p>}
          </div>
          <div className="flex gap-2">
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
