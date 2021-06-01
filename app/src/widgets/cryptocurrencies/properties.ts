import { WidgetProperties } from "widgets/index";

import { WidgetOptions } from "./configuration";

export default {
  widgetType: "cryptocurrencies",
  category: "monitoring",
  configurable: true,
  initialHeight: 2,
  initialWidth: 3,
  initialOptions: {
    fiat: "eur",
    crypto: "bitcoin",
  },
  initialMeta: {
    updateCycle: { minutes: 15 },
    updateStatus: "idle",
  },
} as WidgetProperties<WidgetOptions>;
