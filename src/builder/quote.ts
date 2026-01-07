/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

const LEADING: string = ">";

/**
 * Builder-element for a blockquote
 * @param nodes - Content of this element
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, quote } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   quote(
 *     "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe"
 *   )
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#quoting-text
 * @since 1.0.0
 * @author Simon Kovtyk
 */
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
