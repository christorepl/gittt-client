import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Logout from './Logout';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><Logout /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});