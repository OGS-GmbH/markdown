/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

const CHECKED: string = "x";

/**
 * Builder-element for a task list item
 * @param checked - Whether the task is checked
 * @param node - Content of this element
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, task, list } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   list(
 *     "unordered",
 *     task(true, "Finish project"),
 *     task(false, "Start weekend")
 *   )
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#task-lists
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function task (
  checked: boolean,
  node: Node | string
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
