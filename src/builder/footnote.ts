/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

function footnoteLink (
  index: number
): Node {
  return {
    toString (): string {
      return `[^${ index }]`;
    }
  };
}

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
