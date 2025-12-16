/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";

const CONTAINER_SEP: string = ":::";

function container (
  type: string,
  value: Node | string,
  title?: string
): Node {
  return {
    toString (): string {
      let data: string = `${ CONTAINER_SEP } ${ type }`;

      if (title !== undefined)
        data += ` ${ title }`;


      data += "\n";
      data += value.toString();
      data += "\n";
      data += CONTAINER_SEP;

      return data;
    }
  };
}

export {
  container
};
