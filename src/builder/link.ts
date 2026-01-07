/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

/**
 * Builder-element for a link
 * @param href - Href of the link
 * @param alt - Alt-text of the link
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, link } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   link("https://www.ogs.de", "Best company")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function link (
  href: Node | string,
  alt?: Node | string
): Node {
  return {
    toString (): string {
      return `[${ alt?.toString() ?? href.toString() }](${ href.toString() })`;
    }
  };
}

export {
  link
};
