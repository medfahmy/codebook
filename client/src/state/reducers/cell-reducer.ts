import produce from "immer";
import { ActionType } from "state/action-types";
import { Action } from "state/actions";
import { Cell } from "state/cell";

interface CellState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    };
}

const initialState: CellState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

const randomId = () => {
    return Math.random().toString(36).substr(2, 5);
};

const cellReducer = produce((state: CellState, action: Action) => {
    switch (action.type) {
        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload;
            state.data[id].content = content;
            return;

        case ActionType.DELETE_CELL:
            delete state.data[action.payload];
            state.order = state.order.filter(id => id !== action.payload);
            return;

        case ActionType.MOVE_CELL:
            const { direction } = action.payload;
            const index = state.order.findIndex(id => id === action.payload.id);
            const targetIndex = direction === "up" ? index - 1 : index + 1;

            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return;
            }

            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
            return;

        case ActionType.INSERT_CELL_AFTER:
            const cell: Cell = {
                content: "",
                type: action.payload.type,
                id: randomId(),
            };

            state.data[cell.id] = cell;

            const foundIndex = state.order.findIndex(
                id => id === action.payload.id
            );

            if (foundIndex < 0) {
                state.order.unshift(cell.id);
            } else {
                state.order.splice(foundIndex + 1, 0, cell.id);
            }

            return;

        default:
            return;
    }
}, initialState);
