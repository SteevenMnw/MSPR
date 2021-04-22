import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { expect, it } from "@jest/globals";

import Scan from "../../src/pages/Scan";

describe("<Home />", () => {
    it("has 1 child", () => {
      const tree = renderer.create(<Scan />).toJSON();
      expect(tree.children.length).toBe(1);
    });
  
    // Snapshop de l'ensemble de la page Home
    it("renders correctly", () => {
      const tree = renderer.create(<Scan />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});