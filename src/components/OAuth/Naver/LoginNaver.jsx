import React, { useEffect, useState } from 'react';
import NaverLogo from "../../../assets/images/Naver.png";
const LoginNaver = () => {

    const naverClientId = `fMDjfAFks4nyz8Itoz5_`; // 환경 변수로 설정
    const naverCallbackUrl = `https://www.30ticket.shop/naverloding`;
    const naverClientSecret =`rCrJLLYYoK`;
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${naverClientSecret}&redirect_uri=https://www.30ticket.shop/naverloding`;
    const loginHandler = () => {
    window. location.href = naverAuthUrl;
    };
    
    

    return (
        <div onClick={loginHandler}>
            <img
                            src={NaverLogo}
                            alt="Naver Logo"
                            className="social-logo"
                        />
        </div>
    );
};

export default LoginNaver;