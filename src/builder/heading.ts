/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

type Type = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const HEADING_SIGN: string = "#";

function heading (
  type: Type,
  value: Node | string
): Node {
  return {
    toString (): string {
      const headingSignCount: number = Number(type.slice(1));
      const headingSign: string = HEADING_SIGN.repeat(headingSignCount);

      return `${ headingSign } ${ value.toString() }`;
    }
  };
}

export type {
  Type as HeadingType
};
export {
  heading
};
