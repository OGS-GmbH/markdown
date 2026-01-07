/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

/**
 * Builder-element for an emoji
 * @param value - Name of the emoji
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, emoji } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   emoji(":100:")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://vitepress.dev/guide/markdown#emoji
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function emoji (
  value: Node | string
): Node {
  return {
    toString (): string {
      return `:${ value.toString() }:`;
    }
  };
}

export {
  emoji
};
