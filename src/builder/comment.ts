/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

function comment (value: string | Node): Node {
  return {
    toString (): string {
      return `<!-- ${ value.toString() } -->`;
    }
  };
}

export {
  comment
};
