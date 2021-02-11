import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import HomepageNonUser from './HomepageNonUser';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><HomepageNonUser /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});