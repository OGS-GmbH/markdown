/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

/**
 * Union of all possible alert types
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Type = "note" | "tip" | "important" | "warning" | "caution";

const LEADING: string = ">";

/**
 * Builder-element for an alert
 * @param type - Type of this element
 * @param value - Content of this element
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, alert } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *  alert("important", "I like this lib")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function alert (
  type: Type,
  value: Node | string
): Node {
  return {
    toString (): string {
      return `${ LEADING } [!${ type.toUpperCase() }]\n${ LEADING } ${ value.toString() }`;
    }
  };
}

export type {
  Type as AlertType
};
export {
  alert
};
