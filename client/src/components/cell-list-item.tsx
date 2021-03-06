import { Cell } from "state";
import { CodeCell } from "components/code-cell";
import { TextEditor } from "components/text-editor";
import { ActionBar } from "./action-bar";
import "styles/cell-list-item.css";

interface CellListItemProps {
  cell: Cell;
}

export const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  if (cell.type === "javascript") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <ActionBar id={cell.id} />
        <TextEditor cell={cell} />
      </>
    );
  }

  return <div className="cell-list-item">{child}</div>;
};
