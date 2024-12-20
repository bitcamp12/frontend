import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const CallbackNaver = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");

    useEffect(() => {
        const fetchNaverLogin = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/login/naver?code=${code}&state=${state}`);
                
                if (response.status === 200) {
                    console.log("로그인 성공:", response.data);
                    navigate("/"); // 성공 시 메인 페이지로 이동
                } else {
                    console.error("로그인 실패:", response.data);
                }
            } catch (error) {
                console.error("API 호출 중 에러:", error);
            }
        };

        fetchNaverLogin();
    }, [code, state, navigate]);

    return (
        <div>
            로딩 중입니다...
        </div>
    );
};

export default CallbackNaver;
