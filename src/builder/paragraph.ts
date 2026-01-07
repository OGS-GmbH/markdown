/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

/**
 * Text styles for paragraph
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type TextStyle =
  | "bold"
  | "boldAlt"
  | "italic"
  | "italicAlt"
  | "strikethrough"
  | "strikethroughAlt"
  | "allBoldAndItalic"
  | "subscript"
  | "superscript"
  | "underline";

type TextStyleTag = {
  open: string;
  close: string;
};

const TEXT_STYLE_TAG: Record<TextStyle, TextStyleTag | string> = {
  bold: "**",
  boldAlt: "__",
  italic: "*",
  italicAlt: "_",
  strikethrough: "~~",
  strikethroughAlt: "~",
  allBoldAndItalic: "***",
  subscript: {
    open: "<sub>",
    close: "</sub>"
  },
  superscript: {
    open: "<sup>",
    close: "</sup>"
  },
  underline: {
    open: "<ins>",
    close: "</ins>"
  }
};

/**
 * Options for paragraph
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Options = TextStyle[];

/**
 * Builder-element for a paragraph
 * @param value - Content of this element
 * @param options - Text styles for this paragraph
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, paragraph } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   paragraph("Some sentence", [ "bold", "italic" ])
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#paragraphs
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function paragraph (
  value: Node | string,
  options?: Options
): Node {
  return {
    toString (): string {
      if (options === undefined)
        return value.toString();

      let opening: string = "";
      let closing: string = "";

      for (const option of options) {
        const tag: TextStyleTag | string = TEXT_STYLE_TAG[ option.toString() as TextStyle ];

        if (typeof tag === "string") {
          opening += tag;
          closing = tag + closing;

          continue;
        }

        opening += tag.open;
        closing = tag.close + closing;
      }

      return `${ opening }${ value.toString() }${ closing }`;
    }
  };
}

export type {
  TextStyle as ParagraphTextStyle,
  Options as ParagraphOptions
};
export {
  paragraph
};
