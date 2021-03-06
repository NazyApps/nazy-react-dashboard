import React from "react";

import { render, screen } from "common/testing";
import { widgetContentProps, widgetStatusDisplay } from "common/utils/mock";

import GithubStats from "../index";

describe("<GithubStats />", () => {
  test("renders without errors", () => {
    render(
      <GithubStats
        {...widgetContentProps}
        query="darekkay"
        stars={1}
        followers={2}
        subscribers={3}
        forks={4}
        open_issues={0}
      />
    );

    expect(
      screen.queryByText("widget.common.unconfigured")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("widget-error")).not.toBeInTheDocument();
  });

  test("doesn't render if the query is missing", () => {
    render(<GithubStats {...widgetContentProps} query="" />);
    expect(screen.getByText("widget.common.unconfigured")).toBeInTheDocument();
  });

  test("renders an error if the server returns 404", () => {
    render(
      <GithubStats
        {...widgetContentProps}
        query="darekkay"
        meta={{ ...widgetContentProps.meta, errorCode: 404 }}
      />
    );
    expect(screen.getByTestId("widget-error")).toBeInTheDocument();
  });

  test("triggers an update", () => {
    const triggerUpdate = jest.fn();
    render(
      <GithubStats
        {...widgetContentProps}
        query="darekkay"
        triggerUpdate={triggerUpdate}
      />
    );
    expect(triggerUpdate).toHaveBeenCalledTimes(1);
    expect(triggerUpdate).toHaveBeenCalledWith({
      id: "widget-mock-id",
      params: {
        query: "darekkay",
      },
    });
  });

  test("renders a widgetStatusDisplay when available", () => {
    render(
      <GithubStats
        {...widgetContentProps}
        query="darekkay"
        widgetStatusDisplay={widgetStatusDisplay}
      />
    );
    expect(screen.getByTestId("widget-status-display")).toBeInTheDocument();
  });
});
