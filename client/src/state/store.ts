import { configureStore } from "@reduxjs/toolkit";
import { insertCellAfter, cellsReducer } from "./slices/cell.slice";
import { bundleReducer } from "./slices/bundle.slice";

export const store = configureStore({
    reducer: {
        cells: cellsReducer,
        bundles: bundleReducer,
    },
});

export type TypedDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

store.dispatch(
    insertCellAfter({
        id: null,
        type: "javascript",
    })
);

store.dispatch(
    insertCellAfter({
        id: null,
        type: "markdown",
    })
);

store.dispatch(
    insertCellAfter({
        id: null,
        type: "javascript",
    })
);

store.dispatch(
    insertCellAfter({
        id: null,
        type: "markdown",
    })
);
