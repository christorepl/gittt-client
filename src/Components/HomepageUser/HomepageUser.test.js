import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import HomepageUser from './HomepageUser';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><HomepageUser /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});