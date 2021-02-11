import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import CreateAccount from './CreateAccount';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><CreateAccount /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});