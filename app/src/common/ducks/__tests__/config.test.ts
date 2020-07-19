import {
  initialState,
  reducerWithInitialState,
  actionCreators,
} from "../config";

describe("Settings duck", () => {
  test("updates the color theme", () => {
    const updatedState = reducerWithInitialState()(
      initialState,
      actionCreators.changeTheme("mock")
    );

    expect(updatedState.theme).toEqual("mock");
  });

  test("changes the language", () => {
    const updatedState = reducerWithInitialState()(
      initialState,
      actionCreators.changeLanguage("mock")
    );

    expect(updatedState.language).toEqual("mock");
  });
});
