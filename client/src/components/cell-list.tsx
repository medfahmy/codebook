import { Fragment } from "react";
import { useTypedSelector } from "hooks/use-typed-selector";
import { CellListItem } from "components/cell-list-item";
import { AddCell } from "components/add-cell";
import "styles/cell-list.css";

export const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};
