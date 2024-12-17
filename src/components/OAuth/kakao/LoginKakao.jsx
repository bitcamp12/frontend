import React from 'react';

const LoginKakao = () => {
    const restApikey = "e838336ee6195b503a57e0fd87698d96";

const redirectUrl = "http://localhost:3000";

const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApikey}&redirect_uri=${redirectUrl}&response_type=code`;
const loginHandler = () => {
    window. location.href = kakaoAuthUrl;
    };
    return (
        <div onClick={loginHandler}>
            카카오톡 로그인
        </div>
    );
};

export default LoginKakao;




