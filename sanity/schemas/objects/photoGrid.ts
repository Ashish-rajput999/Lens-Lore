import { defineArrayMember, defineField, defineType } from "sanity";

export const photoGridType = defineType({
  name: "photoGrid",
  title: "Photo grid",
  type: "object",
  fields: [
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "caption", title: "Caption", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      initialValue: 2,
      validation: (rule) => rule.min(2).max(3),
    }),
  ],
});
