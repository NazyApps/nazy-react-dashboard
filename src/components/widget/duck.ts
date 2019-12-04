/** Widget duck */

import { createAction, createReducer } from "redux-starter-kit";
import { MomentInputObject } from "moment";

import widgets from "widgets";
import { initialWidgets } from "widgets/demo";

interface SetValuesPayload {
  id: string;
  values: { [key: string]: any };
}

// Data actions
export const setOptions = createAction<SetValuesPayload>("widget/set-options");
export const setData = createAction<SetValuesPayload>("widget/set-data-value");

// Update actions
export const triggerUpdate = createAction<string>("widget/update-trigger");
export const updateSuccess = createAction<string>("widget/update-success");
export const updateError = createAction<string>("widget/update-error");

// Widget actions
export const createWidget = createAction<{ id: string; type: string }>(
  "widget/create"
);
export const removeWidget = createAction<string>("widget/remove");

export type UpdateStatus = "pending" | "success" | "error";

export interface WidgetMeta {
  updateStatus?: UpdateStatus;
  lastUpdated?: number;
  updateCycle?: MomentInputObject;
}

export interface Widget {
  type: string;
  options: {
    [key: string]: any;
  };
  data: {
    [key: string]: any;
  };
  meta: WidgetMeta;
}

export interface WidgetsState {
  [key: string]: Widget;
}

export const initialState = initialWidgets;

export const reducerWithInitialState = (state: WidgetsState = initialState) =>
  createReducer(state, {
    [setOptions.toString()]: (state, action) => {
      const { id, values } = action.payload;
      state[id].options = { ...state[id].options, ...values };
    },

    [setData.toString()]: (state, action) => {
      const { id, values } = action.payload;
      state[id].data = { ...state[id].data, ...values };
    },

    [triggerUpdate.toString()]: (state, action) => {
      const id = action.payload;
      state[id].meta.updateStatus = "pending";
    },

    [updateSuccess.toString()]: (state, action) => {
      const id = action.payload;
      state[id].meta = {
        ...state[id].meta,
        updateStatus: "success",
        lastUpdated: Date.now()
      };
    },

    [updateError.toString()]: (state, action) => {
      const id = action.payload;
      state[id].meta.updateStatus = "error";
    },

    [createWidget.toString()]: (state, action) => {
      const { id, type } = action.payload;
      state[id] = {
        type,
        data: {},
        options: widgets[type].initialOptions || {},
        meta: widgets[type].initialMeta || {}
      };
    },

    [removeWidget.toString()]: (state, action) => {
      const id = action.payload;
      delete state[id];
    }
  });

export const actionCreators = {
  setOptions,
  setData,
  triggerUpdate
};
