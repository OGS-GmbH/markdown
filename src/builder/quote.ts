/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

const LEADING: string = ">";

function quote (nodes: Array<Node | string>): Node {
  return {
    toString (): string {
      let data: string = "";

      for (const node of nodes)
        data += `${ LEADING } ${ node.toString() }`;


      return data;
    }
  };
}

export {
  quote
};
