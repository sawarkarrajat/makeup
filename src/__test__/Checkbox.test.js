import React from "react";
import renderer from "react-test-renderer";
import Checkbox from "./../components/Checkbox";
import { StateProvider } from "../components/StateProvider";
import reducer, { initialState } from "../components/reducer";
import { render, cleanup } from "@testing-library/react";
// import { useStateValue } from "./../components/StateProvider";
afterEach(() => cleanup());
const treeLabel = "brand",
  filter = "aqua";
// const [state, dispatch] = useStateValue();
it("renders correctly", () => {
  const tree = renderer
    .create(
      <StateProvider initialState={initialState} reducer={reducer}>
        <Checkbox filterLabel={treeLabel} label={filter} />
      </StateProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it("checkbox label exist", () => {
  // eslint-disable-next-line
  const { getByText, getByRole } = render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Checkbox filterLabel={treeLabel} label={filter} />
    </StateProvider>
  );
  // eslint-disable-next-line
  expect(getByText("aqua")).toHaveTextContent(filter);

  // fireEvent.click(getByText("aqua"));
  // const expected = ["aqua"];
  // eslint-disable-next-line
  expect(getByRole("checkbox")).not.toHaveAttribute("disabled");
});
