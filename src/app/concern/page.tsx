import { getConcernsPublic } from "@/services/concern.service";

import { constructMetadata } from "@/lib/metadata";
import ConcernsPortfolioClient from "./ConcernsPortfolioClient";

export const metadata = constructMetadata({
  title: "Our Ecosystem - Fanam Group Concerns",
  description: "Explore the diverse concerns of Fanam Group.",
});

export default async function ConcernsPortfolioPage() {
  let concerns = [];

  try {
    const res = await getConcernsPublic();
    if (res.success) {
      concerns = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch concerns:", error);
  }

  return <ConcernsPortfolioClient concerns={concerns} />;
}
