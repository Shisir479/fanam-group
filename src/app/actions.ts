"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export async function revalidateGlobalCache(tag: string) {
  revalidateTag(tag, "max");
}

export async function revalidatePage(path: string, type?: "page" | "layout") {
  revalidatePath(path, type);
}
