/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

/**
 * Builder-element for a footnote link
 * @param index - Index of the footnote
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, footnoteLink, paragraph } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   paragraph("This is described in footnote"),
 *   foootnoteLink(1)
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function footnoteLink (
  index: number
): Node {
  return {
    toString (): string {
      return `[^${ index }]`;
    }
  };
}

/**
 * Builder-element for a footnote
 * @param index - Index of the footnote
 * @param value - Content of the footnote
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, footnote } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   foootnote(1, "It is described here")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function footnote (
  index: number,
  value: Node | string
): Node {
  return {
    toString (): string {
      return `[^${ index }]: ${ value.toString() }`;
    }
  };
}

export {
  footnoteLink,
  footnote
};
