/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";

/**
 * Builder-element for an image
 * @param source - Source of the image
 * @param alt - Alt-text of the image
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, image } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   image("https://example.com/image.png", "An example image")
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#images
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function image (
  source: Node | string,
  alt?: Node | string
): Node {
  return {
    toString (): string {
      return `![${ alt?.toString() ?? "" }](${ source.toString() })`;
    }
  };
}

export {
  image
};
