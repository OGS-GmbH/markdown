/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

const LEADING_UNORDERED: string = "-";

/**
 * Type of list
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Type = "ordered" | "unordered";

/**
 * Builder-element for a list
 * @param type - Type of list
 * @param nodes - Items of the list
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, list } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   list("unordered", "Computer", "Remote control");
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#lists
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function list (
  type: Type,
  ...nodes: Array<Node | string | null | undefined>
): Node {
  const filteredNodes: Array<Node | string> = nodes.filter((node: Node | string | null | undefined): node is Node | string => node !== null && node !== undefined);

  return {
    toString (): string {
      let data: string = "";

      for (const [ index, value ] of filteredNodes.entries()) {
        const leading: string | number = type === "ordered" ? index + 1 : LEADING_UNORDERED;

        data += `${ leading } ${ value.toString() }\n`;
      }

      return data;
    }
  };
}

export type {
  Type as ListType
};
export {
  list
};
