"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createArtworkSchema, type Artwork } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import { updateArtwork } from "@/lib/actions";

export default function EditArtworkPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Omit<Artwork, "url">>({
    resolver: zodResolver(createArtworkSchema),
  });

  useEffect(() => {
    const fetchArtwork = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("Artwork not found");
        router.push("/admin/artworks");
        return;
      }

      // Pre-fill form
      setValue("title", data.title);
      setValue("category", data.category);
      setValue("year", data.year || undefined);
      setValue("dimensions", data.dimensions || "");
      setValue("price", data.price || undefined);
      setValue("description", data.description || "");

      setImagePreview(data.url);
      setLoading(false);
    };

    fetchArtwork();
  }, [id, setValue, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: Omit<Artwork, "url">) => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      let url = imagePreview; // Keep existing if no new image

      if (imageFile) {
        // Upload new image
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("artworks")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("artworks").getPublicUrl(fileName);
        url = publicUrl;
      }

      await updateArtwork(id, { ...data, url });

      router.push("/admin/artworks");
    } catch (error: any) {
      console.error("Error updating artwork:", error);
      alert("Failed to update artwork: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Artwork</h1>
        <p className="text-muted-foreground">
          Update the details of your artwork.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Artwork Details</CardTitle>
          <CardDescription>
            Modify the information for your artwork.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Artwork title"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  {...register("category")}
                  placeholder="e.g., Oil, Acrylic, Landscape"
                />
                {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  {...register("year", { valueAsNumber: true })}
                  placeholder="2024"
                />
                {errors.year && (
                  <p className="text-sm text-red-500">{errors.year.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  {...register("dimensions")}
                  placeholder="24 x 30 inches"
                />
                {errors.dimensions && (
                  <p className="text-sm text-red-500">
                    {errors.dimensions.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  max="99999999.99"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="1000.00"
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Describe your artwork..."
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Artwork Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-xs max-h-64 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Artwork"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
