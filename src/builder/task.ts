/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

const CHECKED: string = "x";

function task (
  checked: boolean,
  node: Node
): Node {
  return {
    toString (): string {
      const char: string = checked ? CHECKED : " ";

      return `[${ char }] ${ node.toString() }`;
    }
  };
}


export {
  task
};
