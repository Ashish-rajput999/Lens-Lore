import { supabaseAdmin } from "../lib/supabase.js";
import type { CanvasData, LookbookRecord } from "../types.js";

type CreateLookbookInput = {
  userId: string;
  title: string;
  description?: string;
  isPublic?: boolean;
  thumbnailUrl?: string;
  canvasData: CanvasData;
};

export async function createLookbook(input: CreateLookbookInput) {
  const { data, error } = await supabaseAdmin
    .from("lookbooks")
    .insert({
      user_id: input.userId,
      title: input.title,
      description: input.description ?? null,
      is_public: input.isPublic ?? false,
      thumbnail_url: input.thumbnailUrl ?? null,
      canvas_data: input.canvasData,
    })
    .select("*")
    .single<LookbookRecord>();

  if (error) {
    throw error;
  }

  const itemsPayload = input.canvasData.items.map((item, index) => ({
    lookbook_id: data.id,
    product_sanity_id: item.productSanityId,
    x: item.x,
    y: item.y,
    width: item.width,
    height: item.height,
    z_index: item.zIndex ?? index,
  }));

  if (itemsPayload.length > 0) {
    const { error: itemsError } = await supabaseAdmin
      .from("lookbook_items")
      .insert(itemsPayload);

    if (itemsError) {
      throw itemsError;
    }
  }

  return data;
}

export async function listPublicLookbooks(limit = 12) {
  const { data, error } = await supabaseAdmin
    .from("lookbooks")
    .select("id, title, description, thumbnail_url, created_at, updated_at")
    .eq("is_public", true)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data;
}
