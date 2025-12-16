/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

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
