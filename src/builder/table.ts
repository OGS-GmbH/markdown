/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";
import { linebreak } from "./linebreak";

/**
 * Alignment of a table cell
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Align = "left" | "right" | "center";

/**
 * Cell of a table
 * @category Builder types
 *
 * @author Simon Kovtyk
 * @since 1.0.0
 */
type CellNode = Node & {
  /**
   * Length of this cell's content
   *
   * @author Simon Kovtyk
   * @since 1.0.0
   */
  length (): number;
  /**
   * Alignment of this cell
   *
   * @author Simon Kovtyk
   * @since 1.0.0
   */
  align (): Align;
  /**
   * Set value of this cell
   *
   * @author Simon Kovtyk
   * @since 1.0.0
   */
  setValue (value: Node | string): void;
  /**
   * Update value of this cell
   *
   * @author Simon Kovtyk
   * @since 1.0.0
   */
  updateValue (callback: CellNodeUpdateCallback): void;
};

/**
 * Callback to update a cell's value
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type CellNodeUpdateCallback = (value: Node | string) => Node | string;

/**
 * Builder-element for a table cell
 * @param value - Content of this cell
 * @param align - Alignment of this cell
 * @returns A markdown table cell node
 * @category Builder
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function tableCell (value: Node | string, align?: Align): CellNode {
  let currentValue: Node | string = value.toString()
    .split("\n")
    .map((line: string): string => line.trim())
    .join(
      linebreak("html").toString()
    );
  let valueStr: string | undefined;

  function getValueStr (): string {
    valueStr ??= currentValue.toString()
      .split("\n")
      .join(
        linebreak("html").toString()
      );

    return valueStr;
  }

  function clearValueStr (): void {
    valueStr = undefined;
  }

  return {
    toString (): string {
      return getValueStr();
    },
    align (): Align {
      return align ?? "left";
    },
    length (): number {
      return getValueStr().length;
    },
    setValue (newValue: Node | string): void {
      currentValue = newValue;
      clearValueStr();
    },
    updateValue (callback: CellNodeUpdateCallback): void {
      currentValue = callback(currentValue);
      clearValueStr();
    }
  };
}

/**
 * Builder-element for a table row
 * @category Builder types
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type RowNode = Node & {
  /**
   * Cells of this row
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  cells: CellNode[];
  /**
   * Get cell at specific index
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  cellAt (index: number): CellNode | undefined;
  /**
   * Add a cell to this row
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  addCell (node: CellNode): void;
};

const TABLE_SEP: string = "|";

/**
 * Builder-element for a table row
 * @param nodes - Cells of this row
 * @returns A markdown table row node
 * @category Builder
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function tableRow (
  ...nodes: Array<CellNode | null | undefined>
): RowNode {
  const filteredNodes: CellNode[] = nodes.filter((node: CellNode | null | undefined): node is CellNode => node !== null && node !== undefined);

  return {
    toString (): string {
      return `${ TABLE_SEP } ${ filteredNodes.join(` ${ TABLE_SEP } `) } ${ TABLE_SEP }`;
    },
    cellAt (index: number): CellNode | undefined {
      return filteredNodes[ index ];
    },
    cells: filteredNodes,
    addCell (node: CellNode): void {
      filteredNodes.push(node);
    }
  };
}

function getCellLengthInRowIndex (rows: RowNode[], index: number): number | null {
  let length: number | null = null;

  for (const row of rows) {
    const cell: CellNode | undefined = row.cellAt(index);

    if (cell === undefined)
      continue;

    const cellLength: number = cell.length();

    length = length !== null && length > cellLength ? length : cellLength;
  }

  return length;
}

function updateCellLengthInRowIndex (rows: RowNode[], index: number, length: number): void {
  for (const row of rows) {
    const cell: CellNode | undefined = row.cellAt(index);

    if (cell === undefined)
      continue;

    cell.updateValue((value: Node | string) => value.toString().padEnd(length));
  }
}

const BORDER_SEP: string = "-";

function getBorderCellValueByAlign (length: number, align: Align): string {
  switch (align) {
    case "left": {
      return BORDER_SEP.repeat(length);
    }

    case "right": {
      return `${ BORDER_SEP.repeat(length - 1) }:`;
    }

    case "center": {
      return `:${ BORDER_SEP.repeat(length - 2) }:`;
    }
  }
}

/**
 * Builder-element for a table
 * @param rows - Rows of this table
 * @returns A markdown node
 * @category Builder
 * @example
 * ```ts
 * import { define, table, tableRow, tableCell } from "@ogs-gmbh/markdown";
 *
 * const markdown = define(
 *   table(
 *     tableRow(
 *       tableCell("Name", "left"),
 *       tableCell("Price", "left"),
 *     ),
 *     tableRow(
 *       tableCell("Smartphone", "left"),
 *       tableCell("1.300,00 €", "left"),
 *     )
 *   )
 * );
 *
 * console.assert(
 *   markdown.toString()
 * );
 * ```
 *
 * @see https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function table (
  ...rows: Array<RowNode | null | undefined>
): Node {
  const filteredRows: RowNode[] = rows.filter((row: RowNode | null | undefined): row is RowNode => row !== null && row !== undefined);

  return {
    toString (): string {
      const headerRow: RowNode | undefined = filteredRows.at(0);

      if (headerRow === undefined)
        return "";

      const borderRow: RowNode = tableRow();
      const contentRows: RowNode[] = filteredRows.slice(1);

      for (const [ index, cell ] of headerRow.cells.entries()) {
        const length: number | null = getCellLengthInRowIndex(filteredRows, index);

        if (length === null)
          continue;

        updateCellLengthInRowIndex(filteredRows, index, length);

        const borderCell: CellNode = tableCell(
          getBorderCellValueByAlign(length, cell.align())
        );

        borderRow.addCell(borderCell);
      }

      let markdown: string = `${ headerRow.toString() }\n${ borderRow.toString() }`;

      if (contentRows.length !== 0) {
        markdown += "\n";
        markdown += contentRows.map((row: RowNode) => row.toString())
          /* eslint-disable-next-line no-return-assign, no-param-reassign, no-useless-assignment */
          .reduce((acc: string, curr: string): string => acc += `\n${ curr }`);
      }

      return markdown;
    }
  };
}

export type {
  Align as TableAlign,
  CellNode as TableCellNode,
  RowNode as TableRowNode,
  CellNodeUpdateCallback as TableCellNodeUpdateCallback
};
export {
  tableCell,
  tableRow,
  table
};
