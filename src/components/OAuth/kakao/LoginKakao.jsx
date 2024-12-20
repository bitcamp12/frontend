import React from 'react';

const LoginKakao = () => {
    const restApikey = "e838336ee6195b503a57e0fd87698d96";
const redirectUrl = "http://localhost:8080/api/login/kakao";

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
//http://localhost:3000/?code=q7CMqQde0AmZ8HUcri91aeTDJsGbs2Zs2yuu1DyhMZDgrQ-ic7TILQAAAAQKPCQgAAABk9I-lgSvm_uHqQwxKA
export default LoginKakao;




