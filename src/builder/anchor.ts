/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";

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
