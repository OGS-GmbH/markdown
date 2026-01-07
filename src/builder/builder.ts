/**
 * Represents an element of markdown
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Node = {
  /**
   * A function, that wraps the element in a `string`
   * @returns element as string
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  toString (): string;
};

/**
 * The return type of the markdown builder
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type DefineReturn = {
  /**
   * A function, that will convert every node to `string`.
   * @returns All containing elements as string
   * @category Builder types
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  toString (): string;
};

/**
 * Core-API of the builder, that allows to build markdown.
 * @param nodes - Nodes, that gets represented in markdown
 * @returns A result of the definition
 * @category Builder
 * @example
 * ```ts
 * import { define, alert } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *  alert("important", "I like this lib")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function define (...nodes: Array<Node | null | undefined>): DefineReturn {
  return {
    toString (): string {
      let value: string = "";

      for (const node of nodes) {
        if (!node)
          continue;

        value += `${ node.toString() }\n`;
      }

      return value;
    }
  };
}

export type {
  Node,
  DefineReturn
};
export {
  define
};
