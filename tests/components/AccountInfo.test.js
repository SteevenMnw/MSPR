import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import AccountInfo from "../../src/components/AccountInfo";
import { render } from "@testing-library/react-native";
import { expect } from "@jest/globals";

test("render of Accountinfo component", () => {
  const display = renderer.create(<AccountInfo />).toJSON();
  expect(display).toMatchSnapshot();
});

//Permet de generer un test
test("renders default elements and styles", () => {
  const { getAllByText, getByTestId, getByText } = render(<AccountInfo />);

  //Permet de verifier si le text bien(et qu'il en existe 1 de chaque)
  expect(getAllByText("Nom").length).toBe(1);
  expect(getAllByText("Prenom").length).toBe(1);
  expect(getAllByText("Email").length).toBe(1);
  expect(getAllByText("Mot de passe").length).toBe(1);

  //Permet de verifier que le style des champs dans AccountInfo correspond bien
  expect(getByTestId(/test_champView1/i).props.style).toMatchSnapshot(
    {
      backgroundColor: "#ffff",
      margin: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#F05454",
      padding: 15,
    },
    "test champView1 style"
  );

  expect(getByTestId(/test_champView2/i).props.style).toMatchSnapshot(
    {
      backgroundColor: "#ffff",
      margin: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#F05454",
      padding: 15,
    },
    "test champView2 style"
  );

  expect(getByTestId(/test_champView3/i).props.style).toMatchSnapshot(
    {
      backgroundColor: "#ffff",
      margin: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#F05454",
      padding: 15,
    },
    "test champView3 style"
  );

  expect(getByTestId(/test_champView4/i).props.style).toMatchSnapshot(
    {
      backgroundColor: "#ffff",
      margin: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#F05454",
      padding: 15,
    },
    "test champView4 style"
  );

  //Permet de verifier que le style des text static dans AccountInfo correspond bien
  expect(getByText(/Nom/).props.style).toMatchSnapshot(
    {
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 10,
    },
    "test champTextNom style"
  );

  expect(getByText(/Prenom/).props.style).toMatchSnapshot(
    {
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 10,
    },
    "test champTextPrenom style"
  );

  expect(getByText(/Email/).props.style).toMatchSnapshot(
    {
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 10,
    },
    "test champTextEmail style"
  );

  expect(getByText(/Mot de passe/).props.style).toMatchSnapshot(
    {
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 10,
    },
    "test champTextMdp style"
  );
});
