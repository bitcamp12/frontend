import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import interparkLogo from '../assets/images/purpleticket.png'; 
import AppleLogo from '../assets/images/Apple.png'; 
import NaverLogo from '../assets/images/Naver.png'; 
import KakaoLogo from '../assets/images/Kakao.png'; 
import '../styles/Login.css';

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

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

  return (
    <div className="login-container">
      <div className="login-form">
        <Link to="/"><img src={interparkLogo} alt="Interpark Logo" width="200px" className="logo" /></Link>

        <form onSubmit={handleLogin}>
          <h1 className="login-title">로그인</h1>

          <div className="input-container">
            <input
              type="text"
              id="username"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력하세요"
              className="login-input"
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="login-input"
            />
          </div>

          {loginError && <label className="error-message">{loginError}</label>}

          <button type="submit" className="submit-button">로그인</button>

          <div className="keep-login-container">
    <input type="checkbox" id="keep-login" />
    <label htmlFor="keep-login">로그인 상태 유지</label>
</div>

          
          <div className="signup-link">
            <Link to="/findId" className="link-item">아이디 찾기</Link>
            <Link to="/findPwd" className="link-item">비밀번호 찾기</Link>
            <Link to="/signUp" className="link-item">회원가입</Link>
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
