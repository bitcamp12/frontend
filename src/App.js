import React from 'react';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/Login';
import Sign_up from './components/Sign_up';
import Sign_up_Form from './components/Sign_up_Form';
import { BrowserRouter as Router, Routes, Route, BrowserRouter  } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Sign_up />} />
        <Route path="/signUpForm" element={<Sign_up_Form />} />
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
