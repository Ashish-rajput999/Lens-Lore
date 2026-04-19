import { Metadata } from "next";
import { StudioClient } from "@/app/studio/[[...tool]]/StudioClient";

export const metadata: Metadata = {
  title: "Sanity Studio | LENS & LORE",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <StudioClient />;
}
