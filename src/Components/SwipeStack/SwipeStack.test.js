import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import SwipeStack from './SwipeStack';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><SwipeStack /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});