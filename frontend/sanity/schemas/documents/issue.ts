import { defineArrayMember, defineField, defineType } from "sanity";

export const issueType = defineType({
  name: "issue",
  title: "Issue",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "issueNumber", title: "Issue number", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "month", title: "Month", type: "string" }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })],
    }),
  ],
});
