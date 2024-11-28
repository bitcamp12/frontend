import React, { useState, useEffect } from 'react';
import logo from '../assets/images/임시로고.png';
import search from '../assets/images/돋보기.png';
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
                const result = await axios.get('http://localhost:8080/api/members/session-status', {
                    withCredentials: true, 
                });
                if (result.data.status === 200) {
                    console.log("세션있음")
                    setId(true); 
                } else if (result.data.status === 404) {
                    console.log("세션없음")
                    setId(false); 
                }
            } catch (error) {
                console.error("세션체크 에러", error);
            }
        };

        checkLoginStatus(); 
    }, []); 
    
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
        fetchSuggestions(value); 
    };

    const handleSuggestionClick = (suggestion) => {
        if (suggestion.name === "검색 결과가 없습니다") {
            return;
        }
        navigate(`/playDetail/${suggestion.playSeq}`); 
        setShowSuggestions(false);
    };

    const closeSuggestions = () => setShowSuggestions(false);
    const ref = useOutsideClick(closeSuggestions); 

    return (
        <div id="main-bar">
            <div id="main-table">
                <div id="left-section" ref={ref}>
                    <Link to="/"><img id="logo-img" name="logo" src={logo} alt="Logo" /></Link>
                    <Link to="/" className="logoLink"><h1>30 Ticket</h1></Link>
                    <div id="search-bar">
                        <input
                            id="search-input"
                            value={name}
                            onChange={handleInputChange}
                            onFocus={() => setShowSuggestions(true)} 
                            name="search"
                            type="text"
                            placeholder="검색어를 입력하세요"
                        />
                        {showSuggestions && (
                            <div id="suggestions-dropdown">
                                <ul>
                                    {suggestions.map((suggestion, index) => (
                                        <li 
                                            key={index} 
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {suggestion.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div id="search-action">
                            <input type="button" name="searchBtn" id="searchBtn" hidden />
                            <div id="search-icon-div">
                                <img id="search-icon" name="search-icon" src={search} alt="검색 아이콘" width={30} height={30} />
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
