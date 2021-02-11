import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './Login';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><Login /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});