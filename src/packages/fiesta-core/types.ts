export type FiestaASTType = string;

export type FiestaASTAttr = string;

export interface FiestaASTAttrs {
  [name: string]: FiestaASTAttr;
}

export interface FiestaASTNode {
  type: FiestaASTType;
  attrs: FiestaASTAttrs;
  children: FiestaASTNode[];
}

export interface FiestaPlugin {
  name: string;
}
