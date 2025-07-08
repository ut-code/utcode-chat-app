import { styleTags, tags } from "@lezer/highlight";

export const Strikethrough = {
  defineNodes: ["Strikethrough"],
  props: [
    styleTags({
      "Strikethrough/...": tags.deleted,
    }),
  ],
};
