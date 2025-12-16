type LineHighlightRange = {
  from: number;
  to: number;
};

type LineHighlight = (number & {}) | (string & {}) | LineHighlightRange;

const LINE_HIGHLIGHT_PREFIX: string = "{";
const LINE_HIGHLIGHT_SUFFIX: string = "}";
const LINE_HIGHLIGHT_SEP: string = ",";

function formatLineHighlight (...highlights: LineHighlight[]): string {
  return highlights.map((highlight: LineHighlight): string => {
    switch (typeof highlight) {
      case "number": {
        return highlight.toString();
      }

      case "string": {
        return highlight;
      }

      default: {
        return `${ highlight.from }-${ highlight.to }`;
      }
    }
  }).join(LINE_HIGHLIGHT_SEP);
}

type LineNumbers = {
  enabled?: boolean;
  startAt?: number;
} | boolean;

const LINE_NUMBERS_ATTRIBUTE: string = "line-numbers";
const CHAINED_ATTRIBUTES_SEP: string = ":";

export type {
  LineNumbers,
  LineHighlightRange,
  LineHighlight
};
export {
  LINE_HIGHLIGHT_PREFIX,
  LINE_HIGHLIGHT_SUFFIX,
  LINE_NUMBERS_ATTRIBUTE,
  CHAINED_ATTRIBUTES_SEP,
  formatLineHighlight
};
