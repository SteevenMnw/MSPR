import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from "../../src/pages/SignIn";
import {fireEvent, render} from '@testing-library/react-native'
import {expect, it} from '@jest/globals';

// Snapshop de l'ensemble de la page SignIn
/*it('renders correctly', () => {
  const tree = renderer.create(<SignIn />).toJSON();
  expect(tree).toMatchSnapshot();
});*/

//Permet de generer un test
it("renders default elements and styles",() => {
  const {getAllByText, getByPlaceholderText ,getAllByPlaceholderText, getByText, getByTestId} = render(<SignIn />)

  //Permet de verifier si le placeholder existe bien(et qu'il en existe 1 de chaque)
  expect(getAllByPlaceholderText("Mail").length).toBe(1);
  expect(getAllByPlaceholderText("Mot de passe").length).toBe(1);

  //Permet de verifier si le text bien(et qu'il en existe 1 de chaque)
  expect(getAllByText("Se connecter").length).toBe(1);
  expect(getAllByText("Vous n'avez pas encore de compte ?").length).toBe(1);
  expect(getAllByText("S'inscrire").length).toBe(1);

  //Permet de verifier que le style correspond bien
  expect(getByTestId(/test_keyboardAvoidingView/i).props.style).toMatchSnapshot({
    "flex": 1,
  }, "test KeyboardAvoidingView style")
  expect(getByTestId(/test_view_mainContainer/i).props.style).toMatchSnapshot({
    "flex": 1,
    "justifyContent": "center",
  }, "test MainContainer style")
  expect(getByTestId(/test_view_input/i).props.style).toMatchSnapshot({
    "paddingLeft": 70,
    "paddingRight": 70,
  }, "test Input style")
  expect(getByPlaceholderText(/Mail/i).parent.props.style).toMatchSnapshot({
    "alignItems": "center",
    "borderBottomWidth": 1,
    "borderColor": "#86939e",
    "flexDirection": "row",
  }, "test PlaceHolder Input Mail style")
  expect(getByTestId(/test_input_mail/i).props.style).toMatchSnapshot({
    "alignSelf": "center",
    "color": "#242424",
    "flex": 1,
    "fontSize": 18,
    "minHeight": 40,
  }, "test InputMail style")
  expect(getByPlaceholderText(/Mot de passe/i).parent.props.style).toMatchSnapshot({
    "alignItems": "center",
    "borderBottomWidth": 1,
    "borderColor": "#86939e",
    "flexDirection": "row",
  }, "test PlaceHolder Input MotDePasse style")
  expect(getByTestId(/test_input_motDePasse/i).props.style).toMatchSnapshot({
    "alignSelf": "center",
    "color": "#242424",
    "flex": 1,
    "fontSize": 18,
    "minHeight": 40,
  }, "test InputMotDePasse style")
  expect(getByTestId(/test_view_error-button/i).props.style).toBeUndefined()
  expect(getByTestId(/test_text_error/i).props.style).toMatchSnapshot({
    "alignSelf": "center",
    "color": "red",
    "fontSize": 17,
    "paddingBottom": 25,
  }, "test Text Error style")
  expect(getByTestId(/test_button_signIn/i).props.style).toMatchSnapshot({
    "opacity": 1,
  }, "test View Button SignIn style")
  expect(getByText(/Se connecter/i).parent.props.style).toMatchSnapshot({
    "alignItems": "center",
    "alignSelf": "center",
    "backgroundColor": "#ba473c",
    "borderColor": "#2089dc",
    "borderRadius": 3,
    "borderWidth": 0,
    "flexDirection": "row",
    "justifyContent": "center",
    "padding": 8,
    "width": 150,
  }, "test Button SignIn style")
  expect(getByText(/Se connecter/i).props.style).toMatchSnapshot({
    "color": "white",
    "fontSize": 18,
    "paddingVertical": 1,
    "textAlign": "center",
  }, "test Text Button SignIn style")
  expect(getByTestId(/test_view_navigation/i).props.style).toMatchSnapshot({
    "alignSelf": "center",
    "paddingTop": 30,
  }, "test View Navigation style")
  expect(getByTestId(/test_text_beforeNavigation/i).props.style).toBeUndefined()
  expect(getByText(/Vous n'avez pas encore de compte ?/i).props.style).toBeUndefined()
  expect(getByTestId(/test_touchableOpacity_navigation/i).props.style).toMatchSnapshot({
    "alignSelf": "center",
    "opacity": 1,
  }, "test touchableOpacity Navigation style")
  expect(getByTestId(/test_text_navigation/i).props.style).toMatchSnapshot({
    "color": "#ba473c",
  }, "test Text Navigation style1")
  expect(getByText(/S'inscrire/i).props.style).toMatchSnapshot({
    "color": "#ba473c",
  }, "test Text Navigation style2")
});
