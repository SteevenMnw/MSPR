import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Home from "../../src/pages/Home";
//import {fireEvent, render} from '@testing-library/react-native'
import { expect, it } from "@jest/globals";

jest.useFakeTimers();

jest.mock('react-native-tiny-toast', () => ({
  show: jest.fn(),
  hide: jest.fn()
}));

// Snapshop de l'ensemble de la page Home
it("renders correctly", () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});
