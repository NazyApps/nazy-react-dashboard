/** Widget duck */

import { createAction, createReducer } from "@reduxjs/toolkit";
import { MomentInputObject } from "moment";

import widgets from "widgets";
import { Dimensions } from "components/widget/index";
import { IconName } from "components/icon";
import { handleImportState } from "common/ducks/state";

const SUB_STATE_NAME = "widgets";

interface SetValuesPayload {
  id: string;
  values: { [key: string]: any };
}

export interface TriggerUpdateAction {
  id: string;
  params: { [key: string]: any };
}

export interface UpdateActionError {
  id: string;
  error: any;
}

// Data actions
export const setOptions = createAction<SetValuesPayload>("widget/set-options");
export const setData = createAction<SetValuesPayload>("widget/set-data-value");
export const importWidgets = createAction<WidgetsState>("widget/importWidgets");

// Update actions
export const triggerUpdate = (widgetType: string) =>
  createAction<TriggerUpdateAction>(`widget/${widgetType}/update`);
export const updatePending = createAction<string>("widget/update-pending");
export const updateSuccess = createAction<string>("widget/update-success");
export const updateError = createAction<UpdateActionError>(
  "widget/update-error"
);
export const updateAbort = createAction<string>("widget/update-abort"); // NICE: check if really necessary

// Widget actions
export const createWidget = createAction<{ id: string; type: string }>(
  "widget/create"
);
export const removeWidget = createAction<string>("widget/remove");

export type UpdateStatus = "pending" | "success" | "error"; // TODO: add "idle" state as default instead of using undefined

export interface WidgetMeta {
  updateStatus?: UpdateStatus; // TODO: Remove optional flag after introducing "idle" state
  lastUpdated?: number;
  updateCycle?: MomentInputObject;
  errorCode?: number;
  dimensions?: Dimensions;
  headlineIcon?: IconName;
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

export const initialState = {};

export const reducerWithInitialState = (state: WidgetsState = initialState) =>
  createReducer(state, {
    ...handleImportState(SUB_STATE_NAME),

    [setOptions.toString()]: (state, action) => {
      const { id, values } = action.payload;
      state[id].options = { ...state[id].options, ...values };
    },

    [setData.toString()]: (state, action) => {
      const { id, values } = action.payload;
      state[id].data = { ...state[id].data, ...values };
    },

    [importWidgets.toString()]: (state, action) => {
      return action.payload;
    },

    // NICE: for each updateStatus action, check for the correct preciding updateStatus
    // https://mobile.twitter.com/devongovett/status/1256368203594264576

    [updatePending.toString()]: (state, action) => {
      const id = action.payload;
      state[id].meta.updateStatus = "pending";
    },

    [updateSuccess.toString()]: (state, action) => {
      const id = action.payload;
      state[id].meta = {
        ...state[id].meta,
        updateStatus: "success",
        errorCode: undefined,
        lastUpdated: Date.now()
      };
    },

    [updateError.toString()]: (state, action) => {
      const { id, error } = action.payload as UpdateActionError;
      state[id].meta.updateStatus = "error";
      state[id].meta.errorCode = error?.response?.status; // use axios response error code
    },

    [updateAbort.toString()]: (state, action) => {
      const id = action.payload;
      state[id].meta.updateStatus = undefined;
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
