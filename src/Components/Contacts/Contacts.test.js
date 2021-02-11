import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Contacts from './Contacts';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><Contacts /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});