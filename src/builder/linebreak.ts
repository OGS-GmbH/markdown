/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

type Type = "spaces" | "backslash" | "html" | "system";

const SPACES: string = "  ";
const BACKSLASH: string = "\\";
const HTML: string = "<br/>";
/* HACK(simonkov): Will be joined by <LF>, so just keep it empty */
const SYSTEM: string = "";

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

        case "system": {
          return SYSTEM;
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
