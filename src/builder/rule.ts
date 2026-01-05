/* eslint-disable-next-line @tseslint/no-shadow */
import type { Node } from "./builder";

/* eslint-disable-next-line @tseslint/typedef */
const RULE_CHAR = {
  HYPHEN: "-",
  ASTERISK: "*",
  UNDERSCORE: "_"
};

type Type = "hyphens" | "asterisks" | "underscores";

function rule (
  type?: Type,
  repeats: number = 3
): Node {
  let realType: string;

  switch (type) {
    case "hyphens": {
      realType = RULE_CHAR.HYPHEN;

      break;
    }

    case "underscores": {
      realType = RULE_CHAR.UNDERSCORE;

      break;
    }

    case "asterisks": {
      realType = RULE_CHAR.ASTERISK;

      break;
    }

    default: {
      realType = RULE_CHAR.HYPHEN;

      break;
    }
  }

  return {
    toString (): string {
      return realType.repeat(repeats);
    }
  };
}

export type {
  Type as RuleType
};
export {
  rule
};
