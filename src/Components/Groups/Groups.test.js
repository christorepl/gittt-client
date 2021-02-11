import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Groups from './Groups';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><Groups /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});