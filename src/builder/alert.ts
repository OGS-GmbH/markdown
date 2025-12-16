/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

type Type = "note" | "tip" | "important" | "warning" | "caution";

const LEADING: string = ">";

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
