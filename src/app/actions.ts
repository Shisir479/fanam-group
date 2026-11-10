"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export async function revalidateGlobalCache(tag: string) {
  revalidateTag(tag, { expire: 0 });
}

export async function revalidatePage(path: string, type?: "page" | "layout") {
  revalidatePath(path, type);
}
