/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

const LEADING_UNORDERED: string = "-";

type Type = "ordered" | "unordered";

function list (
  type: Type,
  ...nodes: Array<Node | string | null>
): Node {
  const filteredNodes: Array<Node | string> = nodes.filter((node: Node | string | null): node is Node | string => node !== null);

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
