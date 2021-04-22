import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { expect, it } from "@jest/globals";

import { renderHook, act } from "@testing-library/react-hooks";
import QrCode from "../../src/components/QrCode";

jest.useFakeTimers();

jest.mock("react-native-tiny-toast", () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

describe("<Home />", () => {
  // Snapshop de l'ensemble de la page Home
  it("renders correctly", () => {
    const { result } = renderHook(() => QrCode());

    act(() => {
      result.current.setHasPermission == "granted";
      result.current.setShowModal == true;
    });
    const tree = renderer.create(<QrCode />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
