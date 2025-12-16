/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

type Type = "spaces" | "backslash" | "html";

const SPACES: string = "  ";
const BACKSLASH: string = "\\";
const HTML: string = "<br/>";

function linebreak (type: Type): Node {
  return {
    toString (): string {
      switch (type) {
        case "spaces": {
          return SPACES;
        }

        case "backslash": {
          return BACKSLASH;
        }

        case "html": {
          return HTML;
        }
      }
    }
  };
}

export type {
  Type as LinebreakType
};
export {
  linebreak
};
