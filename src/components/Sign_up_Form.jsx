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
  const [verificationPhoneNumber, setVerificationPhoneNumber] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [checkPhoneNumber, setCheckPhoneNumber] = useState('');
  const [timer, setTimer] = useState(0); // 타이머 초를 0으로 초기화
  const [phoneTimer, setPhoneTimer] = useState(0); // 타이머 초를 0으로 초기화
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPhoneTimerActive, setIsPhoneTimerActive] = useState(false);









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

  useEffect(() => {
    let interval = null;
    if (isPhoneTimerActive && phoneTimer > 0) {
      interval = setInterval(() => {
        setPhoneTimer((prevPhoneTimer) => prevPhoneTimer - 1);
      }, 1000);
    } else if (phoneTimer === 0 && isPhoneTimerActive) {
      setIsPhoneTimerActive(false);
      setCheckPhoneNumber('인증번호가 만료되었습니다. 다시 요청해주세요.');
    }
  
    return () => clearInterval(interval);
  }, [phoneTimer, isPhoneTimerActive]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const isNameValid = () => {
    let value=formData.name;
    let formErrors = {};

    if (value.length < 2) {
      formErrors.name = '이름은 최소 2자 이상이어야 합니다.';
    } else {
      formErrors.name = '';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...formErrors,
    }));
  };


  //유효성검사
  const checkId = async (e) => {
    const { value } = e.target;
    let formErrors = {};
  
    // 아이디가 비어있는 경우
    if (!value) {
      formErrors.id = '아이디를 입력해주세요.';
      setErrors(prevErrors => ({
        ...prevErrors,
        ...formErrors,
      }));
      return;
    }
  
    // 아이디가 최소 4자 이상인지 확인
    if (value.length < 4) {
      formErrors.id = '아이디는 최소 4자 이상이어야 합니다.';
      setErrors(prevErrors => ({
        ...prevErrors,
        ...formErrors,
      }));
      return;
    }
  
    // 서버로 아이디 중복 체크 요청
    try {
      const response = await axios.post("http://localhost:8080/api/members/checkId", { id: value });
  
      // 서버 응답 처리
      if (response.data.message === 'exist') {
        setCheck({ id: '존재하는 아이디입니다' });
        formErrors.id = '';
      } else if (response.data.message === 'non_exist') {
        setCheck({ id: '사용 가능한 아이디입니다' });
        formErrors.id = ''; // 유효한 아이디일 경우 오류 메시지 제거
      }
    } catch (error) {
      console.error("아이디 확인 중 오류:", error);
      formErrors.id = '아이디 확인 중 오류가 발생했습니다.';
    }
  
    // 오류 메시지 상태 업데이트
    setErrors(prevErrors => ({
      ...prevErrors,
      ...formErrors,
    }));
  };

  const isPwdValid = () => {
    let formErrors = {}; // 오류 메시지를 저장할 객체
  
    // 비밀번호가 6자 미만일 경우 오류 메시지 설정
    if (!formData.password || formData.password.length < 6) {
      formErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    } else {
      // 비밀번호가 6자 이상이면 오류 메시지 제거
      formErrors.password = '';
    }
  
    // 상태 업데이트
    setErrors(prevErrors => ({
      ...prevErrors,
      ...formErrors,
    }));
  
    // 비밀번호가 6자 이상이면 true 반환
    return formData.password.length >= 6;
  };

  const isChkPwdValid = () => {
    let formErrors = {}; // 오류 메시지를 저장할 객체
  
    // 비밀번호와 비밀번호 확인이 일치하지 않으면 오류 메시지 설정
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    } else {
      // 비밀번호가 일치하면 오류 메시지 제거
      formErrors.confirmPassword = '비밀번호가 일치합니다';
    }
  
    // 상태 업데이트
    setErrors(prevErrors => ({
      ...prevErrors,
      ...formErrors,
    }));
  
    // 비밀번호가 일치하면 true 반환, 아니면 false 반환
    return formData.password === formData.confirmPassword;
  };


  
  
  

  

 

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출을 막습니다.
  
    // 아이디 유효성 검사
    if (!formData.id || errors.id || check.id !== '사용 가능한 아이디입니다') {
      alert('아이디를 확인해주세요');
      return;
    }
  
    // 비밀번호 유효성 검사
    if (!isPwdValid()) {
      alert('비밀번호를 확인해주세요');
      return;
    }
  
    // 비밀번호 확인 유효성 검사
    if (!isChkPwdValid()) {
      alert('비밀번호 확인을 확인해주세요');
      return;
    }
  
    // 이름 유효성 검사
    if (!formData.name || errors.name) {
      alert('이름을 확인해주세요');
      return;
    }
  
    // 이메일 유효성 검사
    if (!formData.email || errors.email) {
      alert('이메일을 확인해주세요');
      return;
    }
  
    // 인증번호 유효성 검사 (이메일)
    if (!verificationNumber || checkNumber !== '인증번호가 일치합니다') {
      alert('이메일 인증번호를 확인해주세요');
      return;
    }
  
    // 휴대폰 번호 유효성 검사
    if (!formData.phone || errors.phone) {
      alert('휴대폰 번호를 확인해주세요');
      return;
    }
  
    // 인증번호 유효성 검사 (휴대폰)
    if (!verificationPhoneNumber || checkPhoneNumber !== '인증번호가 일치합니다') {
      alert('휴대폰 인증번호를 확인해주세요');
      return;
    }
  
    try {
      const result = await axios.post('http://localhost:8080/api/members/signup', formData);
      navigate('/'); // 회원가입 성공 시 이동
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다');
    }
  };
  
  
  
  

  const sendNumber = async () => {
    let formErrors = {};
  
    // 이메일 형식 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    
    // 이메일 형식이 잘못된 경우
    if (!emailRegex.test(formData.email)) {
      formErrors.email = '유효한 이메일 주소를 입력해주세요.';
      setErrors(formErrors);  // 오류 메시지 상태 업데이트
      return;  // 이메일 형식이 맞지 않으면 함수를 종료
    }
  
    // 오류 메시지 제거 (재발송 전에 오류 메시지를 비움)
    setErrors({ email: '' });
  
    try {
      setCheckNumber('');
      await axios.post('http://localhost:8080/api/members/sendNumber',
        {email:formData.email}
      );

      alert('이메일 발송에 성공했습니다');
      setTimer(90); // 3분(180초) 설정
      setIsTimerActive(true);
    } catch (error) {
      console.error('이메일 발송 실패:', error);
      alert('이메일 발송 중 오류가 발생했습니다.');
    }
  };
  
  

  const handleVerificationChange = (e) => {
    setVerificationNumber(e.target.value);
  };

  const handleVerificationPhoneChange = (e) => {
    setVerificationPhoneNumber(e.target.value);
  };

  const checkVerifyNumber = async () => {
    if (timer <= 0) {
      setCheckNumber('인증번호가 만료되었습니다. 다시 요청해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/members/verifyCode',
        {
          email: formData.email,
          code: verificationNumber,
        },
        {
          validateStatus: (status) => {
            return status >= 200 && status < 500; 
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

  const formatPhoneTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  const sendPhoneNumber = async () => {
    let formErrors = {};
    // 휴대폰 번호 유효성 검사 정규식 (01012345678 또는 010-1234-5678 형식 허용)
    const phoneRegex = /^010(\d{4}|\d{3}-\d{4})\d{4}$/;
  
    if (!phoneRegex.test(formData.phone)) {
      formErrors.phone = '유효한 휴대폰 번호를 입력해주세요. 예: 01012345678 또는 010-1234-5678';
      setErrors(prevErrors => ({ ...prevErrors, ...formErrors })); // 상태 업데이트
      return;
    }
  
    try {
      setCheckPhoneNumber('');
      await axios.post("http://localhost:8080/api/members/sendPhoneNumber", { phoneNum: formData.phone });
      alert('문자 발송에 성공했습니다');
      setErrors(prevErrors => ({ ...prevErrors, phone: '' }));
      setPhoneTimer(90); // 90초 설정
      setIsPhoneTimerActive(true); // 타이머 활성화
    } catch (error) {
      console.error('문자 발송 실패:', error);
      alert('문자 발송 중 오류가 발생했습니다.');
    }
  };
  
  
  


  const checkVerifyPhoneNumber = async () => {
    if (phoneTimer <= 0) {
      setCheckPhoneNumber('인증번호가 만료되었습니다. 다시 요청해주세요.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:8080/api/members/verifyPhone',
        {
          phoneNum: formData.phone,
          code: verificationPhoneNumber,
        },
        {
          validateStatus: (status) => {
            return status >= 200 && status < 500; 
          },
        }
      );
  
      if (response.status === 200 && response.data.message === 'match') {
        setCheckPhoneNumber('인증번호가 일치합니다');
        setIsPhoneTimerActive(false);
      } else if (response.status === 400 && response.data.message === 'not_match') {
        setCheckPhoneNumber('인증번호를 다시 확인해주세요');
      } else {
        setCheckPhoneNumber('인증번호 확인 중 문제가 발생했습니다');
      }
    } catch (error) {
      console.error('Error checking phone verification number:', error);
      setCheckPhoneNumber('인증번호 확인 중 오류가 발생했습니다');
    }
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
            onBlur={isPwdValid}
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
            onBlur={isChkPwdValid}
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
            onBlur={isNameValid}
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
            placeholder="이메일인증번호를 입력하세요"
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
          <button type="button" id="phoneButton"onClick={sendPhoneNumber}>인증번호 전송</button>
        </div>
        <div className="errorText">
        {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group" id="verification-group">
          <input
            type="text"
            value={verificationPhoneNumber}
            onChange={handleVerificationPhoneChange}
            placeholder="휴대폰 인증번호를 입력하세요"
            className="input-field"
            onBlur={checkVerifyPhoneNumber}
          />
        </div>
          <div className="errorText">
          {isPhoneTimerActive && <p>남은 시간: {formatPhoneTime(phoneTimer)}</p>}
          {checkPhoneNumber && <span className="checkId">{checkPhoneNumber}</span>}
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
