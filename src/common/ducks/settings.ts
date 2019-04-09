/** Application settings */

import { createAction, createReducer } from "redux-starter-kit";

// TODO: rename to Settings
export interface ConfigState {
  grid: {
    rows: number;
    columns: number;
  };
  theme: string;
}

const changeTheme = createAction("theme-select/change");

const initialState = {
  grid: {
    rows: 3,
    columns: 12
  },
  theme: "default"
};

export const reducerWithInitialState = (state: ConfigState = initialState) =>
  createReducer(state, {
    [changeTheme as any]: (state, action) => ({
      ...state,
      theme: action.payload
    })
  });

export const actionCreators = {
  changeTheme
};


