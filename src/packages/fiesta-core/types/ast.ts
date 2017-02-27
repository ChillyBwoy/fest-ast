import { TagHTML } from "./tags";

export type FiestaASTSpecialType
  = "#text"
  | "#comment"
  | "#cdata";

export type FiestaASTType = TagHTML | FiestaASTSpecialType;

export type FiestaASTAttr = string;

export interface FiestaASTAttrs {
  [name: string]: FiestaASTAttr;
}

export interface FiestaASTNode {
  type: FiestaASTType;
  attrs: FiestaASTAttrs;
  children: FiestaASTNode[];
}
