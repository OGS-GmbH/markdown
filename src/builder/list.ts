/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

const LEADING_UNORDERED: string = "-";

type Type = "ordered" | "unordered";

function list (
  type: Type,
  ...nodes: Array<Node | string>
): Node {
  return {
    toString (): string {
      let data: string = "";

      for (const [ index, value ] of nodes.entries()) {
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
