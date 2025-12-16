/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

function link (
  href: Node | string,
  alt?: Node | string
): Node {
  return {
    toString (): string {
      return `[${ alt?.toString() ?? href.toString() }](${ href.toString() })`;
    }
  };
}

export {
  link
};
