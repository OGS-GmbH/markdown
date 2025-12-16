/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";

function tableOfContent (): Node {
  return {
    toString (): string {
      return "[[toc]]";
    }
  };
}

export {
  tableOfContent
};
