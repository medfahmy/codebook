import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import reducers from "state/reducers";

export type CellType = "javascript" | "markdown";

export interface Cell {
    id: string;
    type: CellType;
    content: string;
}

export type Direction = "up" | "down";

const randomId = () => Math.random().toString(36).substr(2, 5);

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

// TODO: add "order" to backend

const { actions, reducer } = createSlice({
    name: "cells",
    initialState,
    reducers: {
        updateCell(
            state,
            action: PayloadAction<{
                id: string;
                content: string;
            }>
        ) {
            const { id, content } = action.payload;
            state.data[id].content = content;
        },
        deleteCell(state, action: PayloadAction<string>) {
            delete state.data[action.payload];
            state.order = state.order.filter(id => id !== action.payload);
        },
        moveCell(
            state,
            action: PayloadAction<{
                id: string;
                direction: Direction;
            }>
        ) {
            const { direction } = action.payload;
            const index = state.order.findIndex(id => id === action.payload.id);
            const targetIndex = direction === "up" ? index - 1 : index + 1;

            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return;
            }

            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
        },

        insertCellAfter(
            state,
            action: PayloadAction<{ id: string | null; type: CellType }>
        ) {
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
        },
    },
});

export const cellsReducer = reducer;
export const { updateCell, deleteCell, moveCell, insertCellAfter } = actions;
