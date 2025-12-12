import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

type Artwork = Database["public"]["Tables"]["artworks"]["Row"];

async function getArtworks(search?: string, category?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data } = await query;
  return data || [];
}

async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("artworks")
    .select("category")
    .not("category", "is", null);

  const categories = [...new Set(data?.map((item) => item.category) || [])];
  return categories;
}

interface GalleryPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative aspect-square cursor-pointer overflow-hidden">
              <Image
                src={artwork.url}
                alt={artwork.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <DialogHeader className="sr-only">
              <DialogTitle>{artwork.title}</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Image
                src={artwork.url}
                alt={artwork.title}
                width={800}
                height={800}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {artwork.title}
                </h3>
                <p className="text-white/80">
                  {artwork.category} • {artwork.year}
                </p>
                {artwork.dimensions && (
                  <p className="text-white/80">{artwork.dimensions}</p>
                )}
                {artwork.price && (
                  <p className="text-white font-semibold">${artwork.price}</p>
                )}
                <Button asChild className="mt-4">
                  <Link href={`/artwork/${artwork.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{artwork.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {artwork.category} • {artwork.year}
          </p>
          {artwork.price && <p className="font-medium">${artwork.price}</p>}
          <Button asChild variant="outline" size="sm" className="w-full mt-2">
            <Link href={`/artwork/${artwork.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

async function GalleryGrid({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) {
  const artworks = await getArtworks(search, category);

  if (artworks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No artworks found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;
  const categories = await getCategories();

  return (
    <div className="container py-8 flex flex-col items-center">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Gallery</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
          <form className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                name="search"
                placeholder="Search artworks..."
                defaultValue={search}
                className="pl-10"
              />
            </div>
            <Select name="category" defaultValue={category || "all"}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </form>
        </div>
      </div>

      <Suspense
        fallback={<div className="text-center py-12">Loading artworks...</div>}
      >
        <GalleryGrid search={search} category={category} />
      </Suspense>
    </div>
  );
}

export const revalidate = 3600;
