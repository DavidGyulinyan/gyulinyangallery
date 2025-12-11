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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";
import { contactFormSchema } from "@/lib/schemas";
import { ContactForm } from "@/components/contact-form";

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
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden">
          <Image
            src={artwork.url}
            alt={artwork.title}
            fill
            className="object-cover"
            priority
          />
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
              <p>
                <span className="font-medium">SKU:</span>{" "}
                {artwork.id.slice(0, 8).toUpperCase()}
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
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Inquire About "{artwork.title}"</DialogTitle>
                  </DialogHeader>
                  <ContactForm artworkId={artwork.id} />
                </DialogContent>
              </Dialog>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="flex-1">
                  General Inquiry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Contact Gallery</DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
