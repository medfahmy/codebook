import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "state/reducers";
import { ActionType } from "state/action-types";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});

console.log(store.getState());
