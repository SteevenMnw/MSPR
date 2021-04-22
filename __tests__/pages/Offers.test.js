import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Offers from "../../src/pages/Offers";
import { render } from "@testing-library/react-native";
import { expect, it } from "@jest/globals";

jest.useFakeTimers();

jest.mock("react-native-tiny-toast", () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

// Unit test (https://docs.expo.io/guides/testing-with-jest/#unit-test)
describe("<Offers />", () => {
  it("has 2 child", () => {
    const tree = renderer.create(<Offers />).toJSON();
    expect(tree.children.length).toBe(2);
  });

  // Snapshop de l'ensemble de la page Offers
  it("renders correctly", () => {
    const tree = renderer.create(<Offers />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  //Permet de generer un test
  it("renders default elements and styles", () => {
        const {
        getAllByText,
        getByTestId,
        } = render(<Offers />);

        //Permet de verifier si le text bien(et qu'il en existe 1 de chaque)
        expect(getAllByText("Mes offres").length).toBe(1);

        //Permet de verifier que le style correspond bien
        expect(
        getByTestId(/test_view_container/i).props.style
        ).toMatchSnapshot(
        {
            "backgroundColor": "#E8E8E8",
            "flex": 1,
        },
        "test Container View style"
        );
        expect(getByTestId(/test_text_title/i).props.style).toMatchSnapshot(
        {
        "color": "#ba473c",
        "fontSize": 40,
        "fontWeight": "bold",
        "paddingBottom": 5,
        "paddingLeft": 15,
        "paddingTop": 5,
        },
        "test Title Text style"
        );
    });
});
