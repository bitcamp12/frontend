import React, { useState, useEffect } from 'react';
import logo from '../assets/images/임시로고.png';
import search from '../assets/images/돋보기.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/MainNa.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce'; 
import useOutsideClick from './useOutsideClick';

const MainNa = () => {
    const [id, setId] = useState(false); 

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

   
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // 액세스 토큰을 Authorization 헤더에 포함하여 서버로 보냄
                const accessToken = localStorage.getItem("token"); // 로컬스토리지 또는 쿠키에서 가져오기

                const result = await axios.get('http://localhost:8080/api/members/verify-token', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true,
                });

                console.log('Authorization header:', `Bearer ${accessToken}`);


                if (result.status === 200) {
                    console.log("토큰 유효");
                    setId(true); // 로그인 상태
                } else if (result.status === 401) {
                    console.log("액세스 토큰 만료");

                    // 액세스 토큰이 만료되었으면, 리프레시 토큰으로 새 액세스 토큰 발급 요청
                    const refreshToken = getCookie("token"); // 쿠키에서 리프레시 토큰을 가져옴
                    const refreshResult = await axios.post('http://localhost:8080/api/members/refresh-token', { refreshToken }, {
                        withCredentials: true,
                    });

                    if (refreshResult.status === 200 && refreshResult.data.accessToken) {
                        // 새로운 액세스 토큰 저장
                        localStorage.setItem("accessToken", refreshResult.data.accessToken);
                        console.log("새로운 액세스 토큰 발급");
                        setId(true); // 로그인 상태
                    } else {
                        console.log("리프레시 토큰도 만료됨");
                        setId(false); // 로그인 상태 해제
                    }
                }
            } catch (error) {
                console.error("세션 체크 에러", error);
                setId(false); // 오류 발생 시 로그인 상태 해제
            }
        };

        checkLoginStatus();
    }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    const logout = async () => {
        try {
            const result = await axios.post('http://localhost:8080/api/members/logout',{}, {
                withCredentials: true, 
            });
            if (result.data.status === 200) {
                alert(result.data.message)
                setId(false);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

   
    const fetchSuggestions = debounce(async (query) => {
        if (query) {
            try {
                const result = await axios.post('http://localhost:8080/api/plays/searchList', { name: query });
                if (result.data.status === 200 && result.data.data.length > 0) {
                    setSuggestions(result.data.data);
                    setShowSuggestions(true);
                } else {
                    setSuggestions([{ name: "검색 결과가 없습니다" }]);
                    setShowSuggestions(true);
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([{ name: "오류가 발생했습니다. 다시 시도해주세요." }]);
                setShowSuggestions(true);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, 300); 

    const handleInputChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (value.trim() !== "") {
            fetchSuggestions(value); 
        } else {
            setShowSuggestions(false);
        }
    };
    const handleSuggestionClick = (suggestion) => {
        setShowSuggestions(true);
        if (suggestion.name === "검색 결과가 없습니다") {
            return;
        }
        navigate(`/playDetail/${suggestion.playSeq}`); 
        setShowSuggestions(false);
    };

    const closeSuggestions = () => setShowSuggestions(false);
    
    const ref = useOutsideClick(() => {
        closeSuggestions();  // 외부 클릭시 검색 결과 닫기
    });

    const highlightText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) => 
            part.toLowerCase() === highlight.toLowerCase() ? <span key={index} className="highlight">{part}</span> : part
        );
    };

    const handleFocus = () => {
        if (name !== "" && suggestions.length > 0) {
            setShowSuggestions(true);
        }
    };
    

    return (
        <div id="main-bar">
            <div id="main-table">
                <div id="left-section" ref={ref}>
                    <Link to="/"><img id="logo-img" name="logo" src={logo} alt="Logo" /></Link>
                    <Link to="/" className="logoLink"><h1>30 Ticket</h1></Link>
                    <div id="search-bar" className={showSuggestions ? 'dropdown-visible' : ''}>
                        <input
                            id="search-input"
                            value={name}
                            onFocus={handleFocus}
                            onChange={handleInputChange}
                            name="search"
                            type="text"
                            placeholder="검색어를 입력하세요"
                        />
                        {showSuggestions && (
                            <div id="suggestions-dropdown" style={{ display: showSuggestions ? 'block' : 'none' }}>
                                <ul>
                                    {suggestions.map((suggestion, index) => (
                                        <li 
                                            key={index} 
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {highlightText(suggestion.name, name)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div id="search-action">
                            <input type="button" name="searchBtn" id="searchBtn" hidden />
                            <div id="search-icon-div">
                                <i class="bi bi-search" id='search-icon' name="search-icon" src={search} alt="검색 아이콘"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="right-section">
                                { id === true ? (
                    <div id="mypage-section">
                        <Link to="/member"><p id="mypage" name="mypage">마이페이지</p></Link>
                        <p onClick={logout} style={{ cursor: 'pointer' }}>로그아웃</p>
                    </div>
                ) : (
                    <div id="auth-section">
                        <Link to="/login" className='authLink'><p id="login" name="login">로그인</p></Link>
                        <Link to="/signUp" className='authLink'><p id="register" name="register">회원가입</p></Link>
                    </div>
                )}

                </div>
            </div>
        </div>
    );
};

export default MainNa;
