import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders makeup header", () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/makeup/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders makeup sub-header", () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(
    /brands, lipsticks, nailpolish and much more!!!/i
  );
  expect(headerElement).toBeInTheDocument();
});
