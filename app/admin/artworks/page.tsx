import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ArtworkCard } from "@/components/admin/artwork-card";

async function getArtworks() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });

  return data || [];
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
