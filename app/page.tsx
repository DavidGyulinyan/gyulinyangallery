import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

export const revalidate = 3600; // Revalidate every hour

type Artwork = Database["public"]["Tables"]["artworks"]["Row"];

async function getFeaturedArtworks() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("artworks")
    .select("*")
    .limit(6)
    .order("created_at", { ascending: false });

  return data || [];
}

function Hero() {
  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-artwork.jpg"
          alt="Featured artwork"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 md:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Gyulinyan Gallery
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Contemporary art gallery showcasing emerging and established artists
          through innovative exhibitions and curated collections.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/gallery">Explore Gallery</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="bg-white/10 border-white text-white hover:bg-white hover:text-black"
          >
            <Link href="/about">About the Artist</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ArtistBio() {
  return (
    <section className="py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
          About Gevorg Gyulinyan
        </h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto">
          Gevorg Gyulinyan is an architect and painter whose work explores
          color, form, and atmosphere. His paintings balance structure and
          freedom, abstraction and subtle references to the world around us,
          inviting viewers to engage with emotion, reflection, and imagination.
        </p>
        <Button asChild variant="outline" size="sm" className="md:size-default">
          <Link href="/about">Read More</Link>
        </Button>
      </div>
    </section>
  );
}

async function FeaturedCarousel() {
  const artworks = await getFeaturedArtworks();

  if (artworks.length === 0) {
    return (
      <section className="py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
            Featured Artwork
          </h2>
          <div className="text-center text-muted-foreground">
            <p>No artworks available yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
          Featured Artwork
        </h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {artworks.map((artwork) => (
              <CarouselItem
                key={artwork.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="w-full overflow-hidden group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative aspect-4/5">
                      <Image
                        src={artwork.url}
                        alt={artwork.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                        {artwork.category} • {artwork.year}
                      </p>
                      {artwork.price && (
                        <p className="font-medium text-sm md:text-base">
                          ${artwork.price}
                        </p>
                      )}
                      <Button asChild className="w-full mt-2 md:mt-4" size="sm">
                        <Link href={`/artwork/${artwork.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ArtistBio />
      <Suspense
        fallback={
          <div className="py-16 text-center">Loading featured artworks...</div>
        }
      >
        <FeaturedCarousel />
      </Suspense>
    </div>
  );
}
