"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteArtwork(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("artworks").delete().eq("id", id);

  if (error) throw error;

  revalidatePath('/admin/artworks');
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) throw error;

  revalidatePath('/admin/messages');
}

export async function deleteExhibition(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("exhibitions").delete().eq("id", id);

  if (error) throw error;

  revalidatePath('/admin/exhibitions');
}

export async function updateArtwork(id: string, data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("artworks").update(data).eq("id", id);

  if (error) throw error;

  revalidatePath('/admin/artworks');
}