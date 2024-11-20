import React from 'react';
import { Link } from 'react-router-dom';
import NaverLoginLogo from '../assets/images/Naverinter.png';
import KaKaoLoginLogo from '../assets/images/Kakaointer.png';
import '../styles/Sign_up.css';
import interparkLogo from '../assets/images/purpleticket.png';

const Sign_up = () => {
    return (
        <div className="sign-up-wrapper">
            <div className="signup-container">
                <Link to="/"><img src={interparkLogo} className="sign-up-logo" alt="Interpark Logo" style={{ width: '150px', marginBottom: '20px' }} /></Link>

                <h1>30 티켓 회원가입</h1>
                <p>지금 회원가입 하신 후 30 티켓에서 저렴한 가격으로 티켓을 구매해보세요</p>

                <Link to="/signUpForm">
                    <input id="signup-button" type="button" value="개인회원가입" />
                </Link>
                <div className="social-login">
                    <img src={NaverLoginLogo} alt="Naver Login Logo" />
                    <img src={KaKaoLoginLogo} alt="KaKao Login Logo" />
                </div>
                <div className="social-login-p">
                    <p>SNS계정 회원가입(만 14세 이상 가능)</p>
                </div>
            </div>
        </div>
    );
};

export default Sign_up;
