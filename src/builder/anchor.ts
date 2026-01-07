/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";

/**
 * Builder-element for an custom anchor
 * @param value - Content of this element
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, anchor } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   anchor("my-custom-anchor")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://vitepress.dev/guide/markdown#custom-anchors
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function anchor (
  value: Node | string
): Node {
  return {
    toString (): string {
      return `{#${ value.toString() }}`;
    }
  };
}

export {
  anchor
};
