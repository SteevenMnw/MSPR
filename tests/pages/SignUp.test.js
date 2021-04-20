import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native'
import {expect, it} from '@jest/globals';
import SignUp from '../../src/pages/SignUp';

// Snapshop de l'ensemble de la page SignIn
it('renders correctly', () => {
  const tree = renderer.create(<SignUp />).toJSON();
  expect(tree).toMatchSnapshot();
});

//Permet de generer un test
it("renders default elements and styles",() => {
    const {getAllByText, getByPlaceholderText ,getAllByPlaceholderText, getByText, getByTestId} = render(<SignUp />)

    //Permet de verifier si le placeholder existe bien(et qu'il en existe 1 de chaque)
    expect(getAllByPlaceholderText("Nom").length).toBe(1);
    expect(getAllByPlaceholderText("Prenom").length).toBe(1);
    expect(getAllByPlaceholderText("Mail").length).toBe(1);
    expect(getAllByPlaceholderText("Mot de passe").length).toBe(1);
    expect(getAllByPlaceholderText("Confirmer mot de passe").length).toBe(1);
  
    //Permet de verifier si le text bien(et qu'il en existe 1 de chaque)
    expect(getAllByText("S'inscrire").length).toBe(1);
    expect(getAllByText("Vous avez déjà un compte ?").length).toBe(1);
    expect(getAllByText("Se connecter").length).toBe(1);
  
    //Permet de verifier que le style correspond bien
    expect(getByTestId(/test_view_mainContainer/i).props.style).toMatchSnapshot({
      "flex": 1,
      "justifyContent": "center",
    }, "test mainContainer style")
    expect(getByTestId(/test_scrollView/i).props.style).toMatchSnapshot({
        "paddingVertical": 80,
    }, "test scrollView style")
    expect(getByTestId(/test_view_input/i).props.style).toMatchSnapshot({
        "paddingLeft": 70,
        "paddingRight": 70,
    }, "test View Input style")
    expect(getByPlaceholderText("Nom").parent.props.style).toMatchSnapshot({
        "alignItems": "center",
        "borderBottomWidth": 1,
        "borderColor": "#86939e",
        "flexDirection": "row",
    }, "test Name Placeholder style")
    expect(getByTestId(/test_input_name/i).props.style).toMatchSnapshot({
        "alignSelf": "center",
        "color": "#242424",
        "flex": 1,
        "fontSize": 18,
        "minHeight": 40,
    }, "test Name Input style")
    expect(getByPlaceholderText("Prenom").parent.props.style).toMatchSnapshot({
        "alignItems": "center",
        "borderBottomWidth": 1,
        "borderColor": "#86939e",
        "flexDirection": "row",
    }, "test surname Placeholder style")
    expect(getByTestId(/test_input_surname/i).props.style).toMatchSnapshot({
        "alignSelf": "center",
        "color": "#242424",
        "flex": 1,
        "fontSize": 18,
        "minHeight": 40,
    }, "test Surname Input style")
    expect(getByPlaceholderText(/Mail/i).parent.props.style).toMatchSnapshot({
        "alignItems": "center",
        "borderBottomWidth": 1,
        "borderColor": "#86939e",
        "flexDirection": "row",
    }, "test Email Placeholder style")
    expect(getByTestId(/test_input_email/i).props.style).toMatchSnapshot({
        "alignSelf": "center",
        "color": "#242424",
        "flex": 1,
        "fontSize": 18,
        "minHeight": 40,
    }, "test Email Input style")
    expect(getByPlaceholderText("Mot de passe").parent.props.style).toMatchSnapshot({
        "alignItems": "center",
        "borderBottomWidth": 1,
        "borderColor": "#86939e",
        "flexDirection": "row",
    }, "test Password Placeholder style")
    expect(getByTestId(/test_input_password/i).props.style).toMatchSnapshot({
        "alignSelf": "center",
        "color": "#242424",
        "flex": 1,
        "fontSize": 18,
        "minHeight": 40,
    }, "test Password Input style")
    expect(getByPlaceholderText("Confirmer mot de passe").parent.props.style).toMatchSnapshot({
        "alignItems": "center",
        "borderBottomWidth": 1,
        "borderColor": "#86939e",
        "flexDirection": "row",
    }, "test Check Password Placeholder style")
    expect(getByTestId(/test_input_checkPassword/i).props.style).toMatchSnapshot({
        "alignSelf": "center",
        "color": "#242424",
        "flex": 1,
        "fontSize": 18,
        "minHeight": 40,
    }, "test Check Password Input style")
    expect(getByTestId(/test_view_error-button/i).props.style).toBeUndefined()
    expect(getByTestId(/test_text_error/i).props.style).toMatchSnapshot({
      "alignSelf": "center",
      "color": "red",
      "fontSize": 17,
      "paddingBottom": 15,
    }, "test Error Text style")
    expect(getByText(/S'inscrire/i).parent.props.style).toMatchSnapshot({
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
    }, "test SignUp Button style")
    expect(getByText(/S'inscrire/i).props.style).toMatchSnapshot({
      "color": "white",
      "fontSize": 18,
      "paddingVertical": 1,
      "textAlign": "center",
    }, "test SignUp Text style")
    expect(getByTestId(/test_view_navigation/i).props.style).toMatchSnapshot({
      "alignSelf": "center",
      "paddingTop": 30,
    }, "test Navigation View style")
    expect(getByTestId(/test_text_beforeNavigation/i).props.style).toBeUndefined()
    expect(getByText(/Vous avez déjà un compte ?/i).props.style).toBeUndefined()
    expect(getByTestId(/test_text_navigation/i).props.style).toMatchSnapshot({
      "color": "#ba473c",
    }, "test Navigation Text style")
});
