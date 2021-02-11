import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import GroupMenu from './GroupMenu';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><GroupMenu /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});