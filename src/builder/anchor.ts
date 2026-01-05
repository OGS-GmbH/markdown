/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";

/**
 * Builder-element for an custom anchor
 * @param value - Content of this element
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
