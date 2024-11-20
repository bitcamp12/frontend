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

    await new Promise((r) => setTimeout(r, 1000));

    const response = await fetch(
      "로그인 서버 주소",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      }
    );

    const result = await response.json();

    if (response.status === 200) {
      setLoginError("");

      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("id", result.id);
      sessionStorage.setItem("email", result.email);
      sessionStorage.setItem("name", result.name);

      console.log("로그인성공, 이메일주소:" + result.name);

      navigate("/");
    } else {
      setLoginError("이메일 혹은 비밀번호가 틀렸습니다.");
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
