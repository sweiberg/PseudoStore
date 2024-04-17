import React, { useLayoutEffect } from 'react';
import {Routing} from './Routing';
import './App.css';

export const App = () => {
  useLayoutEffect(() => {
    document.title = 'Pseudo Store';
   }, []);
  return (
    <Routing />
  );
}

export default App;