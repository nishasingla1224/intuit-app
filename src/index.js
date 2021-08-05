import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import AppComponent from './components/app';

const renderApplication = () => {
  ReactDOM.render(
    <AppComponent /> ,
    document.querySelector('#root')
  );
}

renderApplication();