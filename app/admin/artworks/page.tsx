import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

type Artwork = Database["public"]["Tables"]["artworks"]["Row"];

async function getArtworks() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });

  return data || [];
}

async function deleteArtwork(id: string) {
  "use server";

  const supabase = await createClient();
  const { error } = await supabase.from("artworks").delete().eq("id", id);

  if (error) throw error;
}

function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0">
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

export default async function ArtworksAdminPage() {
  const artworks = await getArtworks();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Artworks</h1>
          <p className="text-muted-foreground">Manage your gallery artworks.</p>
        </div>
        <Button asChild>
          <Link href="/admin/artworks/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Artwork
          </Link>
        </Button>
      </div>

      {artworks.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No artworks yet.</p>
            <Button asChild>
              <Link href="/admin/artworks/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Artwork
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
}
