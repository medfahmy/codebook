import produce from "immer";
import { ActionType } from "state/action-types";
import { Action } from "state/actions";

interface BundleState {
    [key: string]:
        | {
              loading: boolean;
              code: string;
              err: string;
          }
        | undefined;
}

const initialState: BundleState = {};

const bundleReducer = produce((state: BundleState, action: Action) => {
    switch (action.type) {
        case ActionType.BUNDLE_START:
            state[action.payload.cellId] = {
                loading: true,
                code: "",
                err: "",
            };
            return;

        case ActionType.BUNDLE_COMPLETE:
            state[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err,
            };
            return;

        default:
            return state;
    }
}, initialState);
