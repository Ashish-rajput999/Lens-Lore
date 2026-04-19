import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "brand", title: "Brand", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "price", title: "Price", type: "number", validation: (rule) => rule.required().positive() }),
    defineField({ name: "comparePrice", title: "Compare at price", type: "number" }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "description", title: "Description", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({
      name: "specs",
      title: "Specs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "key", title: "Key", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "inStock", title: "In stock", type: "boolean", initialValue: true }),
    defineField({ name: "stripePriceId", title: "Stripe price ID", type: "string" }),
    defineField({
      name: "featuredInArticles",
      title: "Featured in articles",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })],
    }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
});
