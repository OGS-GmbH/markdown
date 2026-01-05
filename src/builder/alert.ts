/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

/**
 * Union of all possible alert types
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
