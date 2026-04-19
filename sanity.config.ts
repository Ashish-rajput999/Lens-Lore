import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { dataset, projectId } from "@/lib/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "default",
  title: "LENS & LORE Studio",
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
