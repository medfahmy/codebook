import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "state/reducers";
import { ActionType } from "state/action-types";
import { bundlerMiddleware } from "state/middleware/bundler-middleware";

export const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(bundlerMiddleware, thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "markdown",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "markdown",
  },
});
