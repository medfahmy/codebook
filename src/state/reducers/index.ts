import { combineReducers } from "redux";
import cellReducer from "state/reducers/cell-reducer";

const reducers = combineReducers({
  cells: cellReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
