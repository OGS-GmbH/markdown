/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";
import { CHAINED_ATTRIBUTES_SEP, formatLineHighlight, LINE_HIGHLIGHT_PREFIX, LINE_HIGHLIGHT_SUFFIX, LINE_NUMBERS_ATTRIBUTE, type LineHighlight, type LineNumbers } from "./utils";

/**
 * Configuration options for a code-snippet element
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Options = {
  /**
   * Language of the code-snippet
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  language?: string;
  /**
   * Language of the code-snippet
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  lineNumbers?: LineNumbers;
  /**
   * Language of the code-snippet
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  isRelative?: boolean;
  /**
   * Language of the code-snippet
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  section?: string;
  /**
   * Language of the code-snippet
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  lineHighlights?: LineHighlight[];
};

const PREFIX: string = "<<<";
const ABSOLUTE_PREFIX: string = "@";
const SECTION_PREFIX: string = "#";

function formatPath (path: string, section?: string, isRelative?: boolean): string {
  let value: string = path;

  if (section !== undefined)
    value += `${ SECTION_PREFIX }${ section }`;

  if (isRelative !== undefined && !isRelative)
    return `${ ABSOLUTE_PREFIX }/${ value }`;

  return value;
}

function formatAttributes (
  lineHighlights?: LineHighlight[],
  lineNumbers?: LineNumbers,
  language?: string
): string | null {
  const values: string[] = [];

  if (lineHighlights !== undefined) {
    values.push(
      formatLineHighlight(...lineHighlights)
    );
  }

  const chainedValues: string[] = [];

  if (language !== undefined)
    chainedValues.push(language);


  if (lineNumbers !== undefined) {
    let lineNumbersAttribute: string = "";

    switch (typeof lineNumbers) {
      case "boolean": {
        if (!lineNumbers)
          break;

        lineNumbersAttribute = LINE_NUMBERS_ATTRIBUTE;

        break;
      }

      default: {
        if (!lineNumbers.enabled)
          break;

        lineNumbersAttribute = LINE_NUMBERS_ATTRIBUTE;

        if (lineNumbers.startAt !== undefined)
          lineNumbersAttribute += `=${ lineNumbers.startAt }`;

        break;
      }
    }

    chainedValues.push(lineNumbersAttribute);
  }

  if (chainedValues.length !== 0)
    values.push(chainedValues.join(CHAINED_ATTRIBUTES_SEP));

  if (values.length === 0)
    return null;

  return `${ LINE_HIGHLIGHT_PREFIX }${ values.join(" ") }${ LINE_HIGHLIGHT_SUFFIX }`;
}

/**
 * Builder-element for a code-snippet
 * @param path - Path of the code-snippet
 * @param options - Additional options for this element
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, codeSnippet } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   codeSnippet("path/to/code-snippet.ts", { language: "ts" })
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://vitepress.dev/guide/markdown#import-code-snippets
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function codeSnippet (
  path: string,
  options?: Options
): Node {
  return {
    toString (): string {
      let value: string = `${ PREFIX } ${ formatPath(path, options?.section, options?.isRelative) }`;

      const attributes: string | null = formatAttributes(
        options?.lineHighlights,
        options?.lineNumbers,
        options?.language
      );

      if (attributes !== null) {
        value += " ";
        value += attributes;
      }

      return value;
    }
  };
}

export type {
  Options as CodeSnippetOptions
};
export {
  codeSnippet
};
