import produce from "immer";
import { ActionType } from "state/action-types";
import { Action } from "state/actions";

interface BundleState {
  [key: string]: {
    code: string;
    err: string;
  };
}

const initialState: BundleState = {};

export const bundleReducer = produce((state: BundleState, action: Action) => {
  switch (action.type) {
    case ActionType.BUNDLE_CREATED:
      state[action.payload.id] = action.payload.bundle;
      return;

    default:
      return state;
  }
}, initialState);
