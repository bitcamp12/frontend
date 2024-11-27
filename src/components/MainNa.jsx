import React, { useState, useEffect } from 'react';
import logo from '../assets/images/임시로고.png';
import search from '../assets/images/돋보기.png';
import "../assets/css/MainNa.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce'; 

const MainNa = () => {
    const id = sessionStorage.getItem("id");
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const logout = async () => {
        try {
            const result = await axios.post('http://localhost:8080/api/members/logout', { id });
            if (result.data.status === 200) {
                sessionStorage.removeItem("id");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const fetchSuggestions = debounce(async (query) => {
        if (query) {
            try {
                const result = await axios.post('http://localhost:8080/api/plays/searchList', { name: query });
                if (result.data.status === 200) {
                    setSuggestions(result.data.data || []);
                    setShowSuggestions(true);
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions(["검색결과가없습니다"]);
            setShowSuggestions(false);
        }
    }, 300); 

   
    const handleInputChange = (e) => {
        const value = e.target.value;
        setName(value);
        fetchSuggestions(value); 
    };

   
    const handleSuggestionClick = (suggestion) => {
        navigate(`/playDetail?PlaySeq=${suggestion.playSeq}`);
        setShowSuggestions(false); 
    };
    

    return (
        <div id="main-bar">
            <div id="main-table">
           
                <div id="left-section">
                    <Link to="/"><img id="logo-img" name="logo" src={logo} alt="Logo" /></Link>
                    <Link to="/" className="logoLink"><h1>30 Ticket</h1></Link>
                    <div id="search-bar">
                        <input
                            id="search-input"
                            value={name}
                            onChange={handleInputChange}
                            name="search"
                            type="text"
                            placeholder="검색어를 입력하세요"
                        />
                        <div id="search-action">
                            <input type="button" name="searchBtn" id="searchBtn" hidden />
                            <div id="search-icon-div">
                                <img id="search-icon" name="search-icon" src={search} alt="검색 아이콘" width={30} height={30} />
                            </div>
                        </div>
                   
                        {showSuggestions && suggestions.length > 0 && (
                            <div id="suggestions-dropdown">
                                <ul>
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                            {suggestion.name} 
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

             
                <div id="right-section">
                    {id ? (
                        <div id="mypage-section">
                            <p id="mypage" name="mypage">마이페이지</p>
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
