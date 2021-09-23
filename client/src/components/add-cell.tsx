import React from "react";
import { useActions } from "hooks/use-actions";
import "styles/add-cell.css";

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(prevCellId, "javascript")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>code</span>
        </button>

        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(prevCellId, "markdown")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>markdown</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;