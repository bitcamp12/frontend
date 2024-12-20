import React, { useEffect, useState } from 'react';

const LoginNaver = () => {

    const naverClientId = `fMDjfAFks4nyz8Itoz5_`; // 환경 변수로 설정
    const naverCallbackUrl = "http://localhost:3000/naverloding";
    const naverClientSecret =`rCrJLLYYoK`;
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${naverClientSecret}&redirect_uri=${naverCallbackUrl}`;
const loginHandler = () => {
    window. location.href = naverAuthUrl;
    };
    
    

    return (
        <div onClick={loginHandler}>
            네이버 로그인
        </div>
    );
};

export default LoginNaver;