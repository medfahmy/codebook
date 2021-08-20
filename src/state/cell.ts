export type CellType = "code" | "markdown";
// can add languages to this type such as "javascript" or "html" etc

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}
