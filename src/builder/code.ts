/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder.js";
import { CHAINED_ATTRIBUTES_SEP, formatLineHighlight, LINE_HIGHLIGHT_PREFIX, LINE_HIGHLIGHT_SUFFIX, LINE_NUMBERS_ATTRIBUTE, type LineHighlight, type LineNumbers } from "./utils.js";

const TAG: string = "`";

type Options = {
  fileName?: string;
  language?: string;
  isBlock?: boolean;
  lineHighlights?: LineHighlight[];
  lineNumbers?: LineNumbers;
};

const FILENAME_OPEN: string = "[";
const FILENAME_CLOSE: string = "]";

function formatFileName (fileName: string): string {
  return `${ FILENAME_OPEN }${ fileName }${ FILENAME_CLOSE }`;
}

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

      return `${ tag }${ attributesStr }\n${ value.toString() }${ tag }`;
    }
  };
}

export type {
  Options as CodeOptions
};
export {
  code
};
