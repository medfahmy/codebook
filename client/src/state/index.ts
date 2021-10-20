import { createBundle } from "state/slices/bundle.slice";
import {
    deleteCell,
    updateCell,
    insertCellAfter,
    moveCell,
} from "state/slices/cell.slice";

export * from "state/store";
// export * from "state/reducers";
export * from "state/cell";
// export * as actionCreators from "state/action-creators";

export const actions = {
    createBundle,
    moveCell,
    deleteCell,
    insertCellAfter,
    updateCell,
};
