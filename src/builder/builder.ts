type Node = {
  toString (): string;
};

type DefineReturn = {
  toString (): string;
};

function define (...nodes: Node[]): DefineReturn {
  return {
    toString (): string {
      let value: string = "";

      for (const node of nodes)
        value += node.toString();


      return value;
    }
  };
}

export type {
  Node
};
export {
  define
};
