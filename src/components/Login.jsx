import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import interparkLogo from "../assets/images/purpleticket.png";
import AppleLogo from "../assets/images/Apple.png";
import NaverLogo from "../assets/images/Naver.png";
import KakaoLogo from "../assets/images/Kakao.png";
import "../styles/Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from "./Modal/Modal";
import axios from "axios";
import NaverLogin from "./OAuth/Naver/LoginNaver";
import LoginKakao from "./OAuth/kakao/LoginKakao";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
     const FindId = location.state?.userId || ""; // 아이디찾기를 통해 전달된 id 값

    const [id, setId] = useState(FindId);
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [keepLogin, setKeepLogin] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
      if (FindId) {
          setId(FindId);
      }
  }, [FindId]);


 

    const closeModal = () => {
        setAlertVisible(false);
    };

    const toggleKeepLogin = () => {
        setKeepLogin(!keepLogin);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setAlertVisible(true);
            const response = await axios.post(
                "http://localhost:8080/api/members/login",
                {
                    id,
                    password,
                },
                {
                    withCredentials: true, // 세션 쿠키를 포함
                }
            );

            if (response.data.status === 200) {
                setModalTitle("로그인 성공");
                setModalMessage(`환영합니다, ${response.data.message}님`);
                setLoginError("");
               

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else if (response.data.status === 404) {
                setModalTitle("로그인 실패");
                setModalMessage("아이디 혹은 비밀번호가 틀렸습니다.");
            }
        } catch (error) {
            console.error("로그인 중 에러 발생:", error);
            setModalTitle("서버 오류");
            setModalMessage("서버와의 연결에 문제가 발생했습니다.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <Link to="/">
                    <img
                        src={interparkLogo}
                        alt="Interpark Logo"
                        width="200px"
                        className="logo"
                    />
                </Link>

                <form onSubmit={handleLogin}>
                    <div className="input-container">
                        <div className="input-wrapper">
                            <i className="bi bi-person input-icon"></i>
                            <input
                                type="text"
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호"
                                className="login-input"
                            />
                        </div>
                    </div>

                    {loginError && (
                        <label className="error-message">{loginError}</label>
                    )}

                    <div
                        className="keep-login-container"
                        onClick={toggleKeepLogin}
                    >
                        <i
                            className={`bi ${
                                keepLogin
                                    ? "bi-check-circle-fill"
                                    : "bi-check-circle"
                            } keep-login-icon ${keepLogin ? "active" : ""}`}
                        ></i>
                        <label>로그인 상태 유지</label>
                    </div>

                    <button type="submit" className="submit-button">
                        로그인
                    </button>

                    <div className="signup-link">
                        <Link to="/findId" className="link-item">
                            아이디 찾기
                        </Link>{" "}
                        |
                        <Link to="/findPwd" className="link-item">
                            비밀번호 찾기
                        </Link>{" "}
                        |
                        <Link to="/signUp" className="link-item">
                            <span>회원가입</span>
                        </Link>
                    </div>

                    <div className="socialLogin-link">
                        <img
                            src={AppleLogo}
                            alt="Apple Logo"
                            className="social-logo"
                        />
                        <img
                            src={NaverLogo}
                            alt="Naver Logo"
                            className="social-logo"
                        />
                        <NaverLogin/>
                        <img
                            src={KakaoLogo}
                            alt="Kakao Logo"
                            className="social-logo"
                        />
                    </div>
                    <LoginKakao/>
                </form>
            </div>

            <Modal
                closeModal={closeModal}
                modalMessage={modalMessage}
                modalTitle={modalTitle}
                alertVisible={alertVisible}
            />
        </div>
    );
};

export default Login;
