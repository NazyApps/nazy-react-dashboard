import React from "react";
import { injectSaga } from "redux-sagas-injector";
import { MomentInputObject } from "moment";

import { WidgetMeta } from "components/widget/duck";

import availableWidgets from "./list";

export type ValueUpdateAction = ({
  id,
  values
}: {
  id: string;
  values: { [key: string]: any };
}) => void;

export interface WidgetProps {
  id: string;
  meta: WidgetMeta;
  setData: ValueUpdateAction;
  setOptions: ValueUpdateAction;
  triggerUpdate: (id: string) => void;
}

export interface ConfigurationProps {
  id: string;
  options: { [key: string]: any };
  setOptions: ValueUpdateAction;
}

export interface WidgetProperties {
  configurable: boolean;
  initialHeight: number;
  initialWidth: number;
  initialOptions: {
    [key: string]: any;
  };
  initialMeta: {
    updateCycle?: MomentInputObject;
    [key: string]: any;
  };
}

export interface WidgetElements {
  Component: React.ComponentClass<WidgetProps>;
  Configuration: React.ComponentClass<ConfigurationProps>;
}

const importWidgets = (widgets: { [key: string]: WidgetProperties }) =>
  Object.entries(widgets).reduce(
    (acc, [type, values]) => ({
      ...acc,
      [type]: {
        ...values,
        Component: React.lazy(() =>
          import(`widgets/${type}`).then(module => {
            if (module.saga) {
              injectSaga(type, module.saga); // NICE: import dynamically?
            }
            return module;
          })
        ),
        Configuration: values.configurable
          ? React.lazy(() => import(`widgets/${type}/configuration`))
          : null
      }
    }),
    {}
  ) as { [key: string]: WidgetProperties & WidgetElements };

export default importWidgets(availableWidgets);
