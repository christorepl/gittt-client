import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import DeleteAccount from './DeleteAccount';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><DeleteAccount /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});