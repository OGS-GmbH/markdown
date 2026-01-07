/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";

const CONTAINER_SEP: string = ":::";

/**
 * Builder-element for a container
 * @param type - Type of this element
 * @param value - Content of this element
 * @param title - Title of this element
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, container } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *  container("important", "I like this lib", "Important!")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://vitepress.dev/guide/markdown#custom-containers
 * @since 1.0.0
 * @author Simon Kovtyk
 */
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
