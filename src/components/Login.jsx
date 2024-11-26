import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import interparkLogo from '../assets/images/purpleticket.png';
import AppleLogo from '../assets/images/Apple.png';
import NaverLogo from '../assets/images/Naver.png';
import KakaoLogo from '../assets/images/Kakao.png';
import '../styles/Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);


  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    // 1초 지연 (서버 응답을 기다리는 것처럼 보이게 함)
    await new Promise((r) => setTimeout(r, 1000));
  
    try {
      // 로그인 API 호출
      const response = await fetch("http://localhost:8080/api/members/login", {
        method: "POST", // POST 요청을 보냄
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 보내기
        },
        body: JSON.stringify({
          id: id,         // 사용자 입력 ID
          password: password, // 사용자 입력 비밀번호
        }),
      });
  
      // 응답 상태가 200일 때
      if (response.status === 200) {
        setLoginError(""); // 로그인 에러 초기화
        const data = await response.json(); // 응답 본문을 JSON으로 변환
        sessionStorage.setItem("id", data.message); // 세션 스토리지에 로그인된 사용자 ID 저장
        navigate("/"); // 로그인 후 홈 페이지로 이동
      } else {
        setLoginError("아이디 혹은 비밀번호가 틀렸습니다."); // 로그인 실패 시 에러 메시지 표시
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
      setLoginError("서버와의 연결에 문제가 발생했습니다."); // 서버 오류 처리
    }
  };
  

  const toggleKeepLogin = () => {
    setKeepLogin(!keepLogin);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Link to="/"><img src={interparkLogo} alt="Interpark Logo" width="200px" className="logo" /></Link>

        <form onSubmit={handleLogin}>
          <h1 className="login-title"></h1>

          <div className="input-container">
            <div className="input-wrapper">
              <i className="bi bi-person input-icon"></i>
              <input
                type="text"
                id="username"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디"
                className="login-input"
              />
            </div>
            <div className="input-wrapper">
              <i className="bi bi-lock input-icon"></i>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="login-input"
              />
            </div>
          </div>

          {loginError && <label className="error-message">{loginError}</label>}

          <div className="keep-login-container" onClick={toggleKeepLogin}>
            <i className={`bi ${keepLogin ? 'bi-check-circle-fill' : 'bi-check-circle'} keep-login-icon ${keepLogin ? 'active' : ''}`}></i>
            <label htmlFor="keep-login">로그인 상태 유지</label>
          </div>

          <button type="submit" className="submit-button">로그인</button>

          <div className="signup-link">
            <Link to="/findId" className="link-item">아이디 찾기</Link>
            |
            <Link to="/findPwd" className="link-item">비밀번호 찾기</Link>
            |
            <Link to="/signUp" className="link-item"><span>회원가입</span></Link>
          </div>

          <div className="socialLogin-link">
            <img src={AppleLogo} alt="Apple Logo" className="social-logo" />
            <img src={NaverLogo} alt="Naver Logo" className="social-logo" />
            <img src={KakaoLogo} alt="Kakao Logo" className="social-logo" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
