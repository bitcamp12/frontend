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
import LoginGoogle from "./OAuth/Google/LoginGoogle";

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
            setModalTitle("");
            setModalMessage("");
            setAlertVisible(true);
    
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/members/login`,
                {
                    id,
                    password,
                },
                {
                    withCredentials: true, // 쿠키를 허용
                }
            );
    
            if (response.status === 200) {
                setModalTitle("로그인 성공");
                setModalMessage("환영합니다.");
                setLoginError("");
    
                // JWT 토큰을 localStorage에 저장
                const authorizationHeader = response.headers["Authorization"] || response.headers["authorization"]; // 대소문자 구분 없이 Authorization 헤더 확인
                if (authorizationHeader) {
                    const token = authorizationHeader.replace("Bearer ", ""); // "Bearer " 부분을 제거하고 순수 토큰만 추출
                    localStorage.setItem("token", token);
                } else {
                   // console.error("응답에 Authorization 헤더가 없습니다.");
                }
    
                setTimeout(() => {
                    navigate("/"); // 로그인 후 홈 페이지로 이동
                }, 1000);
            }
        } catch (error) {
            // 에러 응답 처리
            if (error.response) {
                // 서버에서 응답이 왔지만 오류 상태 코드일 경우
                if (error.response.status === 401) {
                    setModalTitle("로그인 실패");
                    setModalMessage("아이디 혹은 비밀번호가 틀렸습니다.");
                } else {
                    setModalTitle("서버 오류");
                    setModalMessage("서버와의 연결에 문제가 발생했습니다.");
                }
            } else {
                // 서버와의 연결 자체가 실패한 경우
               // console.error("로그인 중 네트워크 에러 발생:", error);
                setModalTitle("네트워크 오류");
                setModalMessage("서버와의 연결에 문제가 발생했습니다.");
            }
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
                        <label for="keep-login">로그인 상태 유지</label>
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
                       
                        <LoginGoogle/>
                       
                        <NaverLogin/>
                           
                        <LoginKakao/>
                    </div>
                    
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
