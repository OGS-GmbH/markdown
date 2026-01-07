/* eslint-disable-next-line @tseslint/no-shadow */
import type { Node } from "./builder";

/* eslint-disable-next-line @tseslint/typedef */
const RULE_CHAR = {
  HYPHEN: "-",
  ASTERISK: "*",
  UNDERSCORE: "_"
};

/**
 * Type of rule
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Type = "hyphens" | "asterisks" | "underscores";

/**
 * Builder-element for a horizontal rule
 * @param type - Type of this element
 * @param repeats - Number of repeating characters
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, rule } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   rule("hyphen")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://github.com/adam-p/markdown-here/wiki/markdown-cheatsheet#hr
 * @since 1.0.0
 * @author Simon Kovtyk
 */
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
