import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './components/Login';
import Sign_up from './components/Sign_up';
import Sign_up_Form from './components/Sign_up_Form';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Sign_up />} />
        <Route path="/signUpForm" element={<Sign_up_Form />} />
      </Routes>
    </Router>
  );
};

export default App;
