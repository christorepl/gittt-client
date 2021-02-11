import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import AddGames from './AddGames';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Route><AddGames /></Route></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});