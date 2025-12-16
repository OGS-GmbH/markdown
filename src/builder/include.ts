/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";
import { comment } from "./comment";

type Range = {
  from?: number;
  to?: number;
};

type Options = {
  range?: Range;
  section?: string;
};

function formatSection (value: string): string {
  return `#${ value }`;
}

function formatRange (value: Range): string {
  return `{${ value.from ?? "" },${ value.to ?? "" }}`;
}

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
