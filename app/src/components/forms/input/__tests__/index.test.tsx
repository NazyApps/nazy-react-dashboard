import React from "react";

import { render, screen, fireEvent, userEvent } from "common/testing";

import Input from "../index";

describe("<Input />", () => {
  test("renders without errors", () => {
    render(<Input value="text" setValue={() => null} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("handles Enter key up event", async () => {
    const setValue = jest.fn();
    render(<Input value="text" setValue={() => null} onEnter={setValue} />);
    const input = screen.getByRole("textbox");

    expect(setValue).not.toHaveBeenCalled();
    await fireEvent.keyUp(input, { which: 13, key: "Enter" });
    expect(setValue).toHaveBeenCalled();
  });

  test("handles Escape key up event", async () => {
    const setValue = jest.fn();
    render(<Input value="text" setValue={setValue} clearOnEscape />);
    const input = screen.getByRole("textbox");

    expect(setValue).not.toHaveBeenCalled();
    await fireEvent.keyUp(input, { which: 27, key: "Escape" });
    expect(setValue).toHaveBeenCalled();
  });

  test("displays a clear button when focused", async () => {
    const setValue = jest.fn();
    render(<Input value="text" setValue={setValue} clearOnEscape />);

    expect(screen.queryByRole("button", { hidden: true })).toBeNull();

    const input = screen.getByRole("textbox");
    await fireEvent.focus(input);
    expect(screen.getByRole("button", { hidden: true })).toBeInTheDocument();

    await fireEvent.blur(input);
    expect(screen.queryByRole("button", { hidden: true })).toBeNull();

    await fireEvent.focus(input);

    // clicking the clear button should clear the input value
    expect(setValue).not.toHaveBeenCalled();
    userEvent.click(screen.getByRole("button", { hidden: true }));

    expect(setValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledWith("");
  });
});
