import React, { useState, useEffect } from "react";
import logo from "../assets/images/임시로고.png";
import search from "../assets/images/돋보기.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/MainNa.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import useOutsideClick from "./useOutsideClick";
import Modal from "./Modal/Modal";

const MainNa = () => {
    const [id, setId] = useState(false);

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const accessToken = localStorage.getItem("token");
                if (!accessToken) {
                    //console.log("토큰이 없습니다. 로그인되지 않은 상태.");
                    setId(false); // 로그인 상태 해제
                    return; // API 요청을 보내지 않고 종료
                }
    

                const result = await axios.get(`${process.env.REACT_APP_API_URL}/members/session-status`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}` // 토큰을 Authorization 헤더에 포함
                    },
                    withCredentials: true, // 리프레시 토큰을 쿠키로 보내기 위한 설정
                });
                if (result.status === 200) {
                    setId(true); // 로그인 상태
    
                    // 응답에서 새로운 토큰이 있으면 로컬스토리지에 저장
                    const authorizationHeader = result.headers["Authorization"] || result.headers["authorization"];
                    if (authorizationHeader) {
                        const newToken = authorizationHeader.replace("Bearer ", ""); // "Bearer " 제거
                        localStorage.setItem("token", newToken); // 새로운 토큰 저장
                    } else {
                        //console.error("응답에 Authorization 헤더가 없습니다.");
                    }
                } else if (result.status === 401) {
                    // 401 상태는 인증 실패를 의미하므로 로그인 상태를 해제
                    setId(false);
                    console.log("401: 인증 실패");
                }
    
            } catch (error) {
                // 요청 중 오류가 발생한 경우
                console.error("세션 체크 중 오류 발생", error);
                setId(false); // 오류 발생 시 로그인 상태 해제
            }
        };
    
        checkLoginStatus(); // 컴포넌트가 처음 렌더링될 때 한 번만 실행
    }, []);
    

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    const logout = async () => {

            try {
                const accessToken = localStorage.getItem("token");
                const result = await axios.post(
                    `${process.env.REACT_APP_API_URL}/members/logout`, 
                    {}, // 요청 body가 비어 있으면 빈 객체를 전달
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}` // Access Token을 헤더에 추가
                        },
                        withCredentials: true // 리프레시 토큰을 쿠키를 통해 서버로 전달
                    }
                );
             


            if (result.data.status === 200 || result.status === 200) {
                setId(false);
                setModalMessage("로그아웃 되었습니다.");
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                  }, 2000);  // 2초 뒤에 꺼짐
                  localStorage.removeItem("token");   
                
            }
        } catch (error) {
            setId(false);
            setModalMessage("서버 오류로 강제 로그아웃 되었습니다.");
            setAlertVisible(true);
            console.error("Logout error:", error);
        }
    };

    const fetchSuggestions = debounce(async (query) => {
        if (query) {
            try {
                const result = await axios.post(`${process.env.REACT_APP_API_URL}/plays/searchList`, { name: query });

                
                if (result.data.status === 200 && result.data.data.length > 0) {
                    setSuggestions(result.data.data);
                    setShowSuggestions(true);
                } else {
                    setSuggestions([{ name: "검색 결과가 없습니다" }]);
                    setShowSuggestions(true);
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([
                    { name: "오류가 발생했습니다. 다시 시도해주세요." },
                ]);
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
        closeSuggestions(); // 외부 클릭시 검색 결과 닫기
    });

    const highlightText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={index} className="highlight">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    const handleFocus = () => {
        if (name !== "" && suggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

    const [alertVisible, setAlertVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const closeModal = () => {
        setAlertVisible(false);
    };

    return (
        <div id="main-bar">
            <div id="main-table">
                <div id="left-section" ref={ref}>
                    <Link to="/">
                        <img id="logo-img" name="logo" src={logo} alt="Logo" />
                    </Link>
                    <Link to="/" className="logoLink">
                        <h1>30 Ticket</h1>
                    </Link>
                    <div
                        id="search-bar"
                        className={showSuggestions ? "dropdown-visible" : ""}
                    >
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
                            <div
                                id="suggestions-dropdown"
                                style={{
                                    display: showSuggestions ? "block" : "none",
                                }}
                            >
                                <ul>
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                handleSuggestionClick(
                                                    suggestion
                                                )
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            {highlightText(
                                                suggestion.name,
                                                name
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div id="search-action">
                            <input
                                type="button"
                                name="searchBtn"
                                id="searchBtn"
                                hidden
                            />
                            <div id="search-icon-div">
                                <i
                                    class="bi bi-search"
                                    id="search-icon"
                                    name="search-icon"
                                    src={search}
                                    alt="검색 아이콘"
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="right-section">
                    {id === true ? (
                        <div id="mypage-section">
                            <Link to="/member">
                                <p id="mypage" name="mypage">
                                    마이페이지
                                </p>
                            </Link>
                            <p onClick={logout} style={{ cursor: "pointer" }}>
                                로그아웃
                            </p>
                        </div>
                    ) : (
                        <div id="auth-section">
                            <Link to="/login" className="authLink">
                                <p id="login" name="login">
                                    로그인
                                </p>
                            </Link>
                            <Link to="/signUp" className="authLink">
                                <p id="register" name="register">
                                    회원가입
                                </p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                closeModal={closeModal}
                modalMessage={modalMessage}
                modalTitle={modalTitle}
                alertVisible={alertVisible}
            />
        </div>
    );
};

export default MainNa;
