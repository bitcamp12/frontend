import React from 'react';
import logo from '../assets/images/임시로고.png';
import search from '../assets/images/돋보기.png';
import "../assets/css/MainNa.css";
import { Link } from 'react-router-dom';
import Login from './Login';

const MainNa = () => {
    const id = 0;
    return (
        <div id="main-bar">
            <table id="main-table">
                <tbody>
                    <tr>
                        {/* 왼쪽 섹션: 로고와 검색창 */}
                        <td id="left-section">
                            <img id="logo-img" name="logo" src={logo} alt="Logo" />
                            <div id="search-bar">
                                <input id="search-input" name="search" type="text" placeholder="검색어를 입력하세요" />
                                <div id="search-action">
                                    <input type="button" name="searchBtn" id="searchBtn" hidden />
                                    <div id="search-icon-div">
                                        <img id="search-icon" name="search-icon" src={search} alt="검색 아이콘" width={30} height={30} />
                                    </div>
                                </div>
                            </div>
                        </td>

                        {/* 오른쪽 섹션: 로그인/회원가입 또는 마이페이지 */}
                        <td id="right-section">
                            {id ? (
                                <div id="mypage-section">
                                    <p id="mypage" name="mypage">마이페이지</p>
                                </div>
                            ) : (
                                <div id="auth-section">
                                    <Link to="/login"><p id="login" name="login">로그인</p></Link>
                                    <Link to="/signUp"><p id="register" name="register">회원가입</p></Link>
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MainNa;
