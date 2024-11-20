import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Sign_up_Form.css';
import interparkLogo from '../assets/images/purpleticket.png';
import { Link } from 'react-router-dom';

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

  const [check, setCheck] = useState({
    id: '',
  });

  const [verificationNumber, setVerificationNumber] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [timer, setTimer] = useState(0); // 타이머 초를 0으로 초기화
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerActive) {
      setIsTimerActive(false);
      setCheckNumber('인증번호가 만료되었습니다. 다시 요청해주세요.');
    }

    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const checkId = async (e) => {
    const { value } = e.target;

    try {
      const response = await axios.post("http://localhost:8080/api/members/checkId", { id: value });
      
      if (response.data.message === 'exist') {
        console.log(response.data);
        setCheck({ id: '존재하는 아이디입니다' });
      } else if (response.data.message === 'non_exist') {
        console.log(response.data);
        setCheck({ id: '사용 가능한 아이디입니다' });
      }
    } catch (error) {
      console.error("Error checking ID:", error);
      setCheck({ id: '아이디 확인 중 오류가 발생했습니다.' });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let formValid = true;

    if (check.id === '존재하는 아이디입니다') {
      formErrors.id = '아이디 중복 확인을 해주세요.';
      formValid = false;
    }

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
        const result = await axios.post('http://localhost:8080/api/members/signup', formData);
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

  const sendNumber = async () => {
    try {
      await axios.get(`http://localhost:8080/api/members/sendNumber?email=${formData.email}`);
      alert('이메일 발송에 성공했습니다');
      setTimer(180); // 3분(180초) 설정
      setIsTimerActive(true);
    } catch (error) {
      console.error('이메일 발송 실패:', error);
      alert('이메일 발송 중 오류가 발생했습니다.');
    }
  };

  const handleVerificationChange = (e) => {
    setVerificationNumber(e.target.value);
  };

  const checkVerifyNumber = async () => {
    if (timer <= 0) {
      setCheckNumber('인증번호가 만료되었습니다. 다시 요청해주세요.');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/members/verifyCode?email=${encodeURIComponent(formData.email)}&code=${encodeURIComponent(verificationNumber)}`,
        {
          validateStatus: (status) => {
            return status >= 200 && status < 500; // 400 같은 상태 코드도 처리하도록 설정
          },
        }
      );
  
      if (response.status === 200 && response.data.message === 'match') {
        setCheckNumber('인증번호가 일치합니다');
        setIsTimerActive(false); // 타이머 중지
      } else if (response.status === 400 && response.data.message === 'not_match') {
        setCheckNumber('인증번호를 다시 확인해주세요');
      } else {
        setCheckNumber('인증번호 확인 중 문제가 발생했습니다');
      }
    } catch (error) {
      console.error('Error checking verification number:', error);
      setCheckNumber('인증번호 확인 중 오류가 발생했습니다');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="sign-up-form-wrapper">
    <div className="signup-container">
      <Link to="/"><img src={interparkLogo} alt="Interpark Logo" width="200px" className="logo" /></Link>
      
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group" id="id-group">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            onBlur={checkId}
            placeholder="아이디를 입력하세요"
            className="input-field"
          />
        </div>
        <div className="errorText">
          {check.id && <span className="checkId">{check.id} </span>}
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
        </div>
        <div className="errorText">
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
        </div>
        <div className="errorText">
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
        </div>
        <div className="errorText">
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group" id="email-group">
          <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              className="input-field"
            />
            <button type="button" id="emailButton" onClick={sendNumber}>인증번호 전송</button>
        </div>
        <div className="errorText">
        {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group" id="verification-group">
          <input
            type="text"
            value={verificationNumber}
            onChange={handleVerificationChange}
            placeholder="인증번호를 입력하세요"
            className="input-field"
            onBlur={checkVerifyNumber}
          />
        </div>
        <div className="errorText">
          {isTimerActive && <p>남은 시간: {formatTime(timer)}</p>}
          {checkNumber && <span className="checkId">{checkNumber}</span>}
        </div>

        <div className="form-group" id="phone-group">
          <label htmlFor="phone">휴대폰</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="예: 010-1234-5678"
            className="input-field"
          />
          <button type="button" id="phoneButton">인증번호 전송</button>
        </div>
        <div className="errorText">
        {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group" id="verification-group">
          <input
            type="text"
            placeholder="휴대폰 인증번호를 입력하세요"
            className="input-field"
          />
        </div>
        <div className="submitButton">
          <button type="submit" className="submit-button">회원가입</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Sign_up_Form;
