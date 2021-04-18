import 'react-native';
import React from 'react';
import {ReactTestInstance} from 'react-test-renderer';
import SignIn from "../../src/pages/SignIn";
import {fireEvent, render} from '@testing-library/react-native'
import {expect, it} from '@jest/globals';

//global.fetch = jest.fn(() => new Promise(resolve => resolve()));
//jest.mock('react-native-gesture-handler', () => {});

/*it('renders correctly', () => {
  const tree = renderer.create(<SignIn />).toJSON();
  expect(tree).toMatchSnapshot();
});*/

//jest.mock('@react-native-community/async-storage', () => ({setItem: jest.fn()}))

it("renders default elements and styles",() => {
  const {getAllByText, getByPlaceholderText, getByText, getByTestId} = render(<SignIn />)

  expect(getAllByText("S'inscrire").length).toBe(1);
  expect(getAllByText("Vous n'avez pas encore de compte ?").length).toBe(1);
  expect(getAllByText("Se connecter").length).toBe(1);

  getByPlaceholderText("Mail");
  getByPlaceholderText("Mot de passe");

  expect(getByText(/Se connecter/i).parent.props.style).toMatchObject({ 
    alignItems: "center", 
    alignSelf: "center", 
    backgroundColor: "#ba473c",
    borderColor: "#2089dc",
    borderRadius: 3,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
    width: 150
  })
  expect(getByText(/Se connecter/i).props.style).toMatchObject({ 
    color: "white", 
    fontSize: 18, 
    paddingVertical: 1, 
    textAlign: "center" 
  })
  expect(getByText(/S'inscrire/i).parent.props.style).toMatchObject({ 
    alignSelf: "center",
    opacity: 1
  })
  expect(getByText(/S'inscrire/i).props.style).toMatchObject({ 
    color: "#ba473c"
  })
  expect(getByText(/Vous n'avez pas encore de compte ?/i).props.style).toBeUndefined();
  expect(getByText(/Vous n'avez pas encore de compte ?/i).parent.props.style).toMatchObject({
    alignSelf: "center",
    paddingTop: 30
  })
  expect(getByTestId(/error/i).parent.parent.props.style).toBeUndefined();
  expect(getByTestId(/error/i).parent.props.style).toMatchObject({
    paddingBottom: 25,
    alignSelf: "center",
    color: "red",
    fontSize: 17
  })
  expect(getByTestId(/error/i).props.style).toMatchObject({
    paddingBottom: 25,
    alignSelf: "center",
    color: "red",
    fontSize: 17
  })

});

/*it("shows invalid inputs messages",() => {
  const {getByText} = render(<SignIn/>)
  
});*/
