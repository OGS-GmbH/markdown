/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";

/**
 * Builder-element for a table of contents
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, tableOfContent } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   tableOfContent()
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://vitepress.dev/guide/markdown#table-of-contents
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function tableOfContent (): Node {
  return {
    toString (): string {
      return "[[toc]]";
    }
  };
}

export {
  tableOfContent
};
