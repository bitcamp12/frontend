import React, { useEffect, useState } from 'react';

const LoginGoogle = () => {
    const restApikey = "332810267931-3v4gikheu6j8j2l1egm5to3o3opa57lf.apps.googleusercontent.com";
    const redirectUrl = "http://localhost:3000/googleloding";

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${restApikey}&scope=openid%20profile%20email&redirect_uri=${redirectUrl}`;
const loginHandler = () => {
    window. location.href = googleAuthUrl;
    };


 const [logingoogleSuccessUrl, setLogingoogleSuccessUrl] = useState(null);
    useEffect(() => {
        const handleNaverLoginResponse = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const state = urlParams.get('state');
            
            if (code && state) {
                try {
                    const response = await fetch(`http://localhost:8080/api/login/google?code=${code}&state=${state}`);
                    const result = await response.json();
                    if (response.ok) {
                        setLogingoogleSuccessUrl(result.data); // 성공 시 로그인 후 URL 저장
                    } else {
                        console.error(result.message);
                    }
                } catch (error) {
                    console.error("Error during Naver login:", error);
                }
            }
        };

        handleNaverLoginResponse();
    }, []); // 빈 배열을 통해 컴포넌트가 마운트될 때만 실행


    return (
        <div onClick={loginHandler}>
            구글 로그인
        </div>
    );
};

export default LoginGoogle;