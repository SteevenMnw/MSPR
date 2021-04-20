import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import { expect, it } from "@jest/globals";

import Scan from "../../src/pages/Scan";

// Snapshop de l'ensemble de la page Scan
it("renders correctly", () => {
  const tree = renderer.create(<Scan />).toJSON();
  expect(tree).toMatchSnapshot();
});
