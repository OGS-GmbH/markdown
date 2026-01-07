/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";
import { comment } from "./comment";

/**
 * Range of lines to include
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Range = {
  /**
   * Starting line of the range
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  from?: number;
  /**
   * Ending line of the range
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  to?: number;
};

/**
 * Options for the include directive
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Options = {
  /**
   * Range of lines to include
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  range?: Range;
  /**
   * Section to include
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  section?: string;
};

function formatSection (value: string): string {
  return `#${ value }`;
}

function formatRange (value: Range): string {
  return `{${ value.from ?? "" },${ value.to ?? "" }}`;
}

/**
 * Builder-element for an include directive
 * @param path - Path to the file to include
 * @param options - Options for the include directive
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, include } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   include("path/to/file.md", { range: { from: 5, to: 10 } })
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://vitepress.dev/guide/markdown#markdown-file-inclusion
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function include (
  path: string,
  options?: Options
): Node {
  return {
    toString (): string {
      let formatOptions: string = "";

      if (options !== undefined) {
        if (options.section !== undefined)
          formatOptions += formatSection(options.section);


        if (options.range !== undefined)
          formatOptions += formatRange(options.range);
      }

      return comment(
        `@include: ${ path }${ formatOptions }`
      ).toString();
    }
  };
}

export type {
  Range as IncludeRange,
  Options as IncludeOptions
};
export {
  include
};
