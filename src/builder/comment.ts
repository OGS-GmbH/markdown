/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

/**
 * Builder-element for an comment
 * @param value - Content of this element
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, comment } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *  comment("I like this lib")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#hiding-content-with-comments
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function comment (value: string | Node): Node {
  return {
    toString (): string {
      return `<!-- ${ value.toString() } -->`;
    }
  };
}

export {
  comment
};
