import { configureStore } from "@reduxjs/toolkit";
import { insertCellAfter, cellsReducer } from "state/slices/cells.slice";
import { bundleReducer } from "state/slices/bundles.slice";

export const store = configureStore({
    reducer: {
        cells: cellsReducer,
        bundles: bundleReducer,
    },
});

export type TypedDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

store.dispatch(
    insertCellAfter({ id: null, type: "javascript" })
);

store.dispatch(
    insertCellAfter({ id: null, type: "markdown" })
);

store.dispatch(
    insertCellAfter({ id: null, type: "javascript" })
);

store.dispatch(
    insertCellAfter({ id: null, type: "markdown" })
);
