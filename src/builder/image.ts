/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

function image (
  source: Node | string,
  alt?: Node | string
): Node {
  return {
    toString (): string {
      return `![${ alt?.toString() ?? "" }](${ source.toString() })`;
    }
  };
}

export {
  image
};
