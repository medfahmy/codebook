export type CellType = "javascript" | "markdown";

export interface Cell {
    id: string;
    type: CellType;
    content: string;
}
