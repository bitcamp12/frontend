import React from 'react';
import { Link } from 'react-router-dom'; 
import NaverLoginLogo from '../assets/images/Naverinter.png';
import KaKaoLoginLogo from '../assets/images/Kakaointer.png';
import '../styles/Sign_up.css'; 
import interparkLogo from '../assets/images/purpleticket.png'; 

const Sign_up = () => {
    return (
        <div className="signup-container">
            <h1>회원가입</h1>

            <img src={interparkLogo} alt="Interpark Logo" style={{ width: '150px', marginBottom: '20px' }} />
            <Link to="/signUpForm">
                <input id="signup-button" type="button" value="개인회원 가입 페이지로" />
            </Link>

            <div className="social-login">
                <img src={NaverLoginLogo} alt="Naver Login Logo" />
                <img src={KaKaoLoginLogo} alt="KaKao Login Logo" />
            </div>
        </div>
    );
};

export default Sign_up;
