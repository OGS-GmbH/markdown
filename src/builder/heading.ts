/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

/**
 * Type for headings
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Type = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const HEADING_SIGN: string = "#";

/**
 * Builder-element for a heading
 * @param type - Type of this heading
 * @param value - Content of this element
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, heading } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   heading("h1", "Welcome")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#headings
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function heading (
  type: Type,
  value: Node | string
): Node {
  return {
    toString (): string {
      const headingSignCount: number = Number(type.slice(1));
      const headingSign: string = HEADING_SIGN.repeat(headingSignCount);

      return `${ headingSign } ${ value.toString() }`;
    }
  };
}

export type {
  Type as HeadingType
};
export {
  heading
};
