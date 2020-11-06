import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "../App";
import { StateProvider } from "../components/StateProvider";
import reducer, { initialState } from "../components/reducer";

test("App renders makeup header", () => {
  const { getByText } = render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  );
  const headerElement = getByText(/makeup/i);
  expect(headerElement).toBeInTheDocument();
});

test("App renders makeup sub-header", () => {
  const { getByText } = render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  );
  const headerElement = getByText(
    /brands, lipsticks, nailpolish and much more!!!/i
  );
  expect(headerElement).toBeInTheDocument();
});
