import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bundle } from 'bundler';
import { TypedDispatch } from 'state';

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

const { actions, reducer } = createSlice({
    name: 'bundles',
    initialState,
    reducers: {
        bundleStart(state, action: PayloadAction<{ cellId: string }>) {
            state[action.payload.cellId] = {
                loading: true,
                code: '',
                err: '',
            };
        },
        bundleComplete(
            state,
            action: PayloadAction<{
                cellId: string;
                bundle: {
                    code: string;
                    err: string;
                };
            }>
        ) {
            state[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err,
            };
        },
    },
});

const { bundleStart, bundleComplete } = actions;

export const createBundle =
    (cellId: string, input: string) => async (dispatch: TypedDispatch) => {
        dispatch(bundleStart({ cellId }));

        const result = await bundle(input);
        dispatch(bundleComplete({ cellId, bundle: result }));
    };

export const bundleReducer = reducer;
