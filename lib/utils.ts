import { createCn } from "cn/config"

// Register the custom type scale from globals.css so that, for example,
// `text-meta` is treated as a font size and not dropped in favour of a
// later text colour class such as `text-muted-foreground`.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "hero",
            "display",
            "title",
            "heading",
            "subheading",
            "lead",
            "body",
            "label",
            "meta",
            "eyebrow",
          ],
        },
      ],
      shadow: [{ shadow: ["card", "raised"] }],
    },
  },
})
