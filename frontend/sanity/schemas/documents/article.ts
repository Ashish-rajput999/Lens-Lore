import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt text", type: "string" })] }),
    defineField({ name: "issue", title: "Issue", type: "reference", to: [{ type: "issue" }] }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["culture", "gear", "photography", "interview", "essay"].map((value) => ({
          title: value[0]!.toUpperCase() + value.slice(1),
          value,
        })),
      },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "productEmbed" }),
        defineArrayMember({ type: "pullQuote" }),
        defineArrayMember({ type: "photoGrid" }),
      ],
    }),
    defineField({
      name: "featuredProducts",
      title: "Featured products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "product", title: "Product", type: "reference", to: [{ type: "product" }] }),
            defineField({ name: "contextNote", title: "Context note", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "seoMeta",
      title: "SEO metadata",
      type: "object",
      fields: [
        defineField({ name: "title", title: "SEO title", type: "string" }),
        defineField({ name: "description", title: "SEO description", type: "text", rows: 3 }),
        defineField({ name: "ogImage", title: "Open Graph image", type: "image", options: { hotspot: true } }),
      ],
    }),
  ],
});
