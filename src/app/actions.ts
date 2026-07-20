"use server";

import { revalidateTag } from "next/cache";

export async function revalidateGlobalCache(tag: string) {
  revalidateTag(tag, "max");
}
