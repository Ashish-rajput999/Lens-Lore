import { defineField, defineType } from "sanity";

export const pullQuoteType = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "attribution", title: "Attribution", type: "string" }),
  ],
});
