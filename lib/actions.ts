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