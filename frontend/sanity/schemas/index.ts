import { articleType } from "@/sanity/schemas/documents/article";
import { authorType } from "@/sanity/schemas/documents/author";
import { issueType } from "@/sanity/schemas/documents/issue";
import { productType } from "@/sanity/schemas/documents/product";
import { photoGridType } from "@/sanity/schemas/objects/photoGrid";
import { productEmbedType } from "@/sanity/schemas/objects/productEmbed";
import { pullQuoteType } from "@/sanity/schemas/objects/pullQuote";

export const schemaTypes = [
  articleType,
  authorType,
  issueType,
  productType,
  productEmbedType,
  pullQuoteType,
  photoGridType,
];
