import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";
import { ContactForm } from "@/components/contact-form";
import { ZoomableImage } from "@/components/ui/zoomable-image";

type Artwork = Database["public"]["Tables"]["artworks"]["Row"];

async function getArtwork(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}

interface ArtworkPageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { id } = await params;
  const artwork = await getArtwork(id);

  if (!artwork) {
    notFound();
  }

  return (
    <div className="container py-8 flex flex-col items-center">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image */}
        <div className="relative aspect-square lg:aspect-auto lg:h-150 lg:col-span-2 rounded-lg overflow-hidden">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer">
                <Image
                  src={artwork.url}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 hover:opacity-100 transition-opacity text-sm font-medium">
                    Click to zoom
                  </span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/90 overflow-hidden">
              <DialogHeader className="sr-only">
                <DialogTitle>{artwork.title}</DialogTitle>
              </DialogHeader>
              <ZoomableImage
                src={artwork.url}
                alt={artwork.title}
                width={1200}
                height={1200}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {artwork.title}
            </h1>
            <div className="space-y-1 text-muted-foreground">
              <p>
                <span className="font-medium">Year:</span> {artwork.year}
              </p>
              <p>
                <span className="font-medium">Medium:</span> {artwork.category}
              </p>
              {artwork.dimensions && (
                <p>
                  <span className="font-medium">Dimensions:</span>{" "}
                  {artwork.dimensions}
                </p>
              )}
              {artwork.materials && (
                <p>
                  <span className="font-medium">Materials:</span>{" "}
                  {artwork.materials}
                </p>
              )}
              <p>
                <span className="font-medium">SKU:</span> {artwork.sku}
              </p>
            </div>
          </div>

          {artwork.price && (
            <div>
              <p className="text-2xl font-bold">${artwork.price}</p>
            </div>
          )}

          {artwork.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {artwork.description}
              </p>
            </div>
          )}

          {/* Purchase/Inquiry CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            {artwork.price && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="flex-1">
                    Purchase Inquiry
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-125">
                  <DialogHeader>
                    <DialogTitle>Inquire About "{artwork.title}"</DialogTitle>
                  </DialogHeader>
                  <ContactForm artworkId={artwork.id} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
