/* eslint-disable @tseslint/no-shadow */
import type { Node } from "./builder";

type Align = "left" | "right" | "center";

type CellNode = Node & {
  length (): number;
  align (): Align;
  setValue (value: Node | string): void;
  updateValue (callback: CellNodeUpdateCallback): void;
};

type CellNodeUpdateCallback = (value: Node | string) => Node | string;

function tableCell (value: Node | string, align?: Align): CellNode {
  let currentValue: Node | string = value;
  let valueStr: string | undefined;

  function getValueStr (): string {
    valueStr ??= currentValue.toString();

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
      currentValue = callback(value);
      clearValueStr();
    }
  };
}

type RowNode = Node & {
  cells: CellNode[];
  cellAt (index: number): CellNode | undefined;
  addCell (node: CellNode): void;
};

const TABLE_SEP: string = "|";

function tableRow (
  ...nodes: Array<CellNode | null>
): RowNode {
  const filteredNodes: CellNode[] = nodes.filter((node: CellNode | null): node is CellNode => node !== null);

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

function table (
  ...rows: Array<RowNode | null>
): Node {
  const filteredRows: RowNode[] = rows.filter((row: RowNode | null): row is RowNode => row !== null);

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

      const content: string = contentRows.map((row: RowNode) => row.toString())
      /* eslint-disable-next-line no-return-assign, no-param-reassign, no-useless-assignment */
        .reduce((acc: string, curr: string): string => acc += `\n${ curr }`);

      return `${ headerRow.toString() }\n${ borderRow.toString() }\n${ content }`;
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
