import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const CallbackNaver = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    const [id, setId] = useState(null); // 초기값을 null로 설정
    useEffect(() => {
        const fetchNaverLogin = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/login/naver?code=${code}&state=${state}`);
                
                if (response.status === 200) {
                    console.log("로그인 성공:", response.data);
                    setId(response.data.data)
                } else {
                    console.error("로그인 실패:", response.data);
                }
            } catch (error) {
                console.error("API 호출 중 에러:", error);
            }
        };

        fetchNaverLogin();
    }, [code, state, navigate]);

    useEffect(() => {
        const loginUser = async () => {
            if (!id) return; // id가 없으면 실행하지 않음
    
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/members/login`,
                    {
                        id: id,
                        password: id,
                    },
                    {
                        withCredentials: true, // 쿠키를 허용
                    }
                );
    
                if (response.status === 200) {
                    console.log("로그인 성공:", response.data);
    
                    // JWT 토큰 저장
                    const authorizationHeader =
                        response.headers["Authorization"] || response.headers["authorization"];
                    if (authorizationHeader) {
                        const token = authorizationHeader.replace("Bearer ", "");
                        localStorage.setItem("token", token);
                    } else {
                        console.error("응답에 Authorization 헤더가 없습니다.");
                    }
    
                    setTimeout(() => {
                        navigate("/"); // 홈 페이지로 이동
                    }, 1000);
                } else if (response.status === 404) {
                    console.error("사용자 정보를 찾을 수 없습니다.");
                }
            } catch (error) {
                console.error("로그인 요청 중 에러:", error.response?.data || error.message);
            }
        };
    
        loginUser();
    }, [id, navigate]);
    

    
    



    return (
        <div>
            로딩 중입니다...
        </div>
    );
};

export default CallbackNaver;
