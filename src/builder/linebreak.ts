/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

/**
 * Type of linebreak
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Type = "spaces" | "backslash" | "html" | "system";

const SPACES: string = "  ";
const BACKSLASH: string = "\\";
const HTML: string = "<br/>";
/* HACK(simonkov): Will be joined by <LF>, so just keep it empty */
const SYSTEM: string = "";

/**
 * Builder-element for a linebreak
 * @param type - Type of this element
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, linebreak, paragraph } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   paragraph("Here a leading sentence..."),
 *   linebreak("html"),
 *   paragraph("...and here the trailing one.")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#line-breaks
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function linebreak (type: Type): Node {
  return {
    toString (): string {
      switch (type) {
        case "spaces": {
          return SPACES;
        }

        case "backslash": {
          return BACKSLASH;
        }

        case "html": {
          return HTML;
        }

        case "system": {
          return SYSTEM;
        }
      }
    }
  };
}

export type {
  Type as LinebreakType
};
export {
  linebreak
};
