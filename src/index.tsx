import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "components/App";
import ThemeSelect from "components/theme-select/ThemeSelect";

import config from "./config";
import initStore from "./store";
// import * as serviceWorker from "./common/serviceWorker";

import "./styles/mixins.scss";
import "./styles/base.scss";
import "./styles/utilities.scss";
import "./styles/layout.scss";
import "./styles/typography.scss";

const store = initStore({ config });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/* TODO: move into App */
ReactDOM.render(
  <Provider store={store}>
    <ThemeSelect />
  </Provider>,
  document.getElementById("theme-toggle")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister(); // TODO: enable service worker
