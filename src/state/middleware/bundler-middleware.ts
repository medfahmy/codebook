import { bundle } from "bundler";
import { ActionType } from "state/action-types";
import { Middleware } from "state/middleware/middleware";

let timer: any;

export const bundlerMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type !== ActionType.UPDATE_CELL) {
      return;
    }

    const {
      cells: { data },
    } = getState();

    const cell = data[action.payload.id];
    if (cell.type === "markdown") {
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(async () => {
      console.log("starting bundling");
      const result = await bundle(action.payload.content);

      dispatch({
        type: ActionType.BUNDLE_CREATED,
        payload: {
          id: action.payload.id,
          bundle: result,
        },
      });

      console.log("dispatched bundle created");
    }, 750);
  };
