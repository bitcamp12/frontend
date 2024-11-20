import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed in your project
import { useNavigate } from 'react-router-dom';
import '../styles/Sign_up_Form.css';
import interparkLogo from '../assets/images/purpleticket.png';

const Sign_up_Form = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    let formValid = true;

    if (formData.id.length < 4) {
      formErrors.id = '아이디는 4자 이상이어야 합니다.';
      formValid = false;
    }

    if (formData.password.length < 6) {
      formErrors.password = '비밀번호는 6자 이상이어야 합니다.';
      formValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      formValid = false;
    }

    if (!formData.name) {
      formErrors.name = '이름을 입력해주세요.';
      formValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      formErrors.email = '유효한 이메일 주소를 입력해주세요.';
      formValid = false;
    }

    const phoneRegex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      formErrors.phone = '유효한 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)';
      formValid = false;
    }

    setErrors(formErrors);
    return formValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await axios.post('http://localhost:8080/api/member/signup', formData);
        alert(result.data);
        sessionStorage.setItem('token', result.data.token);
        sessionStorage.setItem('email', result.data.email);
        sessionStorage.setItem('role', result.data.role);
        sessionStorage.setItem('storeid', result.data.storeId);
        console.log('로그인 성공, 이메일 주소:', result.data.email);
       
        navigate('/');
      } catch (error) {
        console.error('로그인 실패:', error);
      }
    } else {
      console.log('폼에 오류가 있습니다.');
    }
  };

  return (
    <div className="sign-up-form-wrapper">
    <div className="signup-container">
      <img src={interparkLogo} alt="Interpark Logo" width="200px" className="logo" />
      <h1>회원가입</h1>
      
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group" id="id-group">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            className="input-field"
          />
          {errors.id && <span className="error">{errors.id}</span>}
        </div>

        <div className="form-group" id="password-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            className="input-field"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group" id="confirm-password-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 확인하세요"
            className="input-field"
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group" id="name-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            className="input-field"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group" id="email-group">
          <label htmlFor="email">이메일</label>
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              className="input-field"
            />
            <button type="button" className="auth-btn">이메일 인증</button>
          </div>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group" id="phone-group">
          <label htmlFor="phone">휴대폰 번호</label>
          <div className="input-container">
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="휴대폰 번호를 입력하세요 (예: 010-1234-5678)"
              className="input-field"
            />
            <button type="button" className="auth-btn">휴대폰 인증</button>
          </div>
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <button type="submit" className="submit-btn">회원가입</button>
      </form>
    </div>
    </div>
  );
};

export default Sign_up_Form;
