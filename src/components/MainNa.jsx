import React from 'react';
import logo from '../assets/images/임시로고.png';
import search from '../assets/images/돋보기.png';
import "../assets/css/MainNa.css";
import { Link } from 'react-router-dom';

const MainNa = () => {
    const id = 0;
    return (
        <div id="main-bar">
            <div id="main-table">
                {/* Left section: logo and search */}
                <div id="left-section">
                    <Link to="/"><img id="logo-img" name="logo" src={logo} alt="Logo" /></Link>
                    <h1>30 Ticket</h1>
                    <div id="search-bar">
                        <input id="search-input" name="search" type="text" placeholder="검색어를 입력하세요" />
                        <div id="search-action">
                            <input type="button" name="searchBtn" id="searchBtn" hidden />
                            <div id="search-icon-div">
                                <img id="search-icon" name="search-icon" src={search} alt="검색 아이콘" width={30} height={30} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right section: login/signup or mypage */}
                <div id="right-section">
                    {id ? (
                        <div id="mypage-section">
                            <p id="mypage" name="mypage">마이페이지</p>
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