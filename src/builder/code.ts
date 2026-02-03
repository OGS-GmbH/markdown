/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";
import { CHAINED_ATTRIBUTES_SEP, formatLineHighlight, LINE_HIGHLIGHT_PREFIX, LINE_HIGHLIGHT_SUFFIX, LINE_NUMBERS_ATTRIBUTE, type LineHighlight, type LineNumbers } from "./utils.js";

const TAG: string = "`";

/**
 * Configuration options for a code element
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Options = {
  /**
   * File name
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  fileName?: string;
  /**
   * Language of the code
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  language?: string;
  /**
   * Flag to define, whether this is a block code or inline code
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  isBlock?: boolean;
  /**
   * Highlight lines
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  lineHighlights?: LineHighlight[];
  /**
   * Line numbers
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  lineNumbers?: LineNumbers;
};

const FILENAME_OPEN: string = "[";
const FILENAME_CLOSE: string = "]";

function formatFileName (fileName: string): string {
  return `${ FILENAME_OPEN }${ fileName }${ FILENAME_CLOSE }`;
}

/**
 * Builder-element for code
 * @param value - The content of this element
 * @param options - Configuration options for this element
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, code } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   code("let a = 5;", { language: "ts" })
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#quoting-code
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function code (
  value: Node | string,
  options?: Options
): Node {
  return {
    toString (): string {
      const isBlock: boolean = options?.isBlock ?? false;

      if (!isBlock)
        return `${ TAG }${ value.toString() }${ TAG }`;

      const attributes: string[] = [];
      const chainedAttributes: string[] = [];

      if (options?.language !== undefined) {
        chainedAttributes.push(
          options.language
        );
      }

      if (options?.lineNumbers !== undefined) {
        let lineNumbersAttribute: string | null = null;

        switch (typeof options.lineNumbers) {
          case "boolean": {
            if (!options.lineNumbers)
              break;

            lineNumbersAttribute = LINE_NUMBERS_ATTRIBUTE;

            break;
          }

          default: {
            if (!options.lineNumbers.enabled)
              break;

            lineNumbersAttribute = LINE_NUMBERS_ATTRIBUTE;

            if (options.lineNumbers.startAt !== undefined)
              lineNumbersAttribute += `=${ options.lineNumbers.startAt }`;


            break;
          }
        }

        if (lineNumbersAttribute !== null) {
          chainedAttributes.push(
            lineNumbersAttribute
          );
        }
      }

      if (chainedAttributes.length !== 0) {
        attributes.push(
          chainedAttributes.join(CHAINED_ATTRIBUTES_SEP)
        );
      }

      if (options?.lineHighlights !== undefined) {
        attributes.push(
          LINE_HIGHLIGHT_PREFIX + formatLineHighlight(...options.lineHighlights) + LINE_HIGHLIGHT_SUFFIX
        );
      }

      if (options?.fileName !== undefined) {
        const formatedFileName: string = formatFileName(options.fileName);

        attributes.push(
          attributes.length === 0
            ? ` ${ formatedFileName }`
            : formatedFileName
        );
      }

      const attributesStr: string = attributes.length === 0 ? "" : attributes.join(" ");
      const tag: string = TAG.repeat(3);

      return `${ tag }${ attributesStr }\n${ value.toString() }\n${ tag }`;
    }
  };
}

export type {
  Options as CodeOptions
};
export {
  code
};
