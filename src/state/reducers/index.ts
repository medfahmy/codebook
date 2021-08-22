import { combineReducers } from "redux";
import { cellReducer } from "state/reducers/cell-reducer";
import { bundleReducer } from "./bundle-reducer";

const reducers = combineReducers({
  cells: cellReducer,
  bundles: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
