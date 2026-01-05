/**
 * Represents an element of markdown
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
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  toString (): string;
};

/**
 * Core-API of the builder, that allows to build markdown.
 * @params nodes - Nodes, that gets represented in markdown
 * @returns A result of the definition
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function define (...nodes: Array<Node | null>): DefineReturn {
  return {
    toString (): string {
      let value: string = "";

      for (const node of nodes) {
        if (node === null)
          continue;

        value += node.toString();
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
