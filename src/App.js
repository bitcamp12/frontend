import React from 'react';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/buttons/ScrollToTop';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Main />
        <ScrollToTop />
      </BrowserRouter>
    </>
  );
};

export default App;