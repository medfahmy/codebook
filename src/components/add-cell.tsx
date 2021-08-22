import React from "react";
import { useActions } from "hooks/use-actions";
import "styles/add-cell.css";

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellBefore } = useActions();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellBefore(nextCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>code</span>
        </button>

        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellBefore(nextCellId, "markdown")}
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
