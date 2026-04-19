import { defineField, defineType } from "sanity";

export const productEmbedType = defineType({
  name: "productEmbed",
  title: "Product embed",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Used In This Story" }),
    defineField({ name: "product", title: "Product", type: "reference", to: [{ type: "product" }] }),
    defineField({ name: "note", title: "Context note", type: "text", rows: 3 }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "note",
    },
  },
});
