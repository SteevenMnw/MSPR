import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Profile from "../../src/pages/Profile";
import { render } from "@testing-library/react-native";
import { expect, it } from "@jest/globals";

it("render of Profile page", () => {
  const display = renderer.create(<Profile />).toJSON();
  expect(display).toMatchSnapshot();
});

//Permet de generer un test
it("renders default elements and styles", () => {
  const { getAllByText, getByTestId } = render(<Profile />);

  //Permet de verifier si le text bien(et qu'il en existe 1 de chaque)
  expect(getAllByText("Mon Compte").length).toBe(1);

  //Permet de verifier que le style correspond bien
  expect(getByTestId(/view_container/i).props.style).toMatchSnapshot(
    {
      flex: 1,
      backgroundColor: "#E8E8E8",
    },
    "test container style"
  );

  expect(getByTestId(/text_monCompte/i).props.style).toMatchSnapshot(
    {
      fontSize: 40,
      paddingLeft: 15,
      paddingTop: 5,
      fontWeight: "bold",
      color: "#ba473c",
    },
    "test textMonCompte style"
  );
});
