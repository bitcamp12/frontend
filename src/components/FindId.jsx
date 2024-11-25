import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MainNa from "./MainNa";

import "../assets/css/FindId.css";

const FindId = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [verificationPhoneNumber, setVerificationPhoneNumber] = useState(""); 
  const [verificationEmailCode, setVerificationEmailCode] = useState(""); 
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false); 
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false); 
  const [phoneTimer, setPhoneTimer] = useState(60);
  const [emailTimer, setEmailTimer] = useState(60);
  const [isPhoneExpired, setIsPhoneExpired] = useState(false);
  const [isEmailExpired, setIsEmailExpired] = useState(false);

  useEffect(() => {
    if (location.pathname === "/findId") {
      setSelectedOption("phone");
    }
  }, [location.pathname]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneVerificationChange = (e) => {
    setVerificationPhoneNumber(e.target.value);
  };

  const handleEmailVerificationChange = (e) => {
    setVerificationEmailCode(e.target.value);
  };

  useEffect(() => {
    let phoneCountdown, emailCountdown;

    if (isPhoneCodeSent && !isPhoneExpired) {
      phoneCountdown = setInterval(() => {
        setPhoneTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(phoneCountdown); 
            setIsPhoneExpired(true); 
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    if (isEmailCodeSent && !isEmailExpired) {
      emailCountdown = setInterval(() => {
        setEmailTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(emailCountdown); 
            setIsEmailExpired(true); 
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(phoneCountdown); 
      clearInterval(emailCountdown); 
    };
  }, [isPhoneCodeSent, isEmailCodeSent, isPhoneExpired, isEmailExpired]);

  const requestPhoneVerificationCode = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/members/sendPhoneVerificationCode',
        {
          name: formData.name,
          phoneNum: formData.phone
        }
      )
      if (response.data.status === 200) {
        alert("인증번호가 휴대폰으로 전송되었습니다.");
        setIsPhoneCodeSent(true); 
        setPhoneTimer(60); 
        setIsPhoneExpired(false);
      } else {
        alert("일치하는 회원정보가 없습니다.");
      }
    } catch (error) {
      console.error("에러", error);
      alert("서버와의 연결에 문제가 발생했습니다.");
    }
  };

  const checkPhoneNum = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/members/checkPhone?name=${formData.name}&phone=${formData.phone}&code=${verificationPhoneNumber}`
      );
      if (response.data.status === 200) {
        getIdByPhone();
      } else {
        alert("인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("에러", error);
      alert("인증번호를 다시 받아주세요");
    }
  };

  const requestEmailVerificationCode = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/members/sendEmailVerificationCode?name=${formData.name}&email=${formData.email}`);
      if (response.data.status === 200) {
        alert("인증번호가 이메일로 전송되었습니다.");
        setIsEmailCodeSent(true); 
        setEmailTimer(60); 
        setIsEmailExpired(false);
      } else if (response.data.status === 400) {
        alert("일치하는 회원이 없습니다.");
      } else {
        alert("이메일 인증번호 전송 실패.");
      }
    } catch (error) {
      console.error("에러", error);
      alert("서버와의 연결에 문제가 발생했습니다.");
    }
  };

  const getIdByPhone = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/members/getIdByPhone", {
        phone: formData.phone,
        name: formData.name,
      });

      if (response.data.status === 200) {
        sessionStorage.setItem("userId", response.data.message); 
        navigate("/findIdDetail");
      } else if (response.data.status === 404) {
        alert("회원 정보가 없습니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("에러", error);
      alert("서버와의 연결에 문제가 발생했습니다.");
    }
  };

  const getIdByEmail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/members/verifyCodeId?name=${formData.name}&email=${formData.email}&code=${verificationEmailCode}`
      );

      if (response.data.status === 200) {
        sessionStorage.setItem("userId", response.data.message); 
        navigate("/findIdDetail");
      } else if (response.data.status === 400) {
        alert("회원 정보가 없습니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("에러", error);
      alert("이메일인증을 다시 진행해주세요");
    }
  };

  return (
    <>
      <MainNa />
      <div className="searchContainer">
        <div className="searchIdWrapper">
          {/* 최상단 뒤로가기 버튼 */}
          {/* <button onClick={() => Navigate("/login")}>←</button> */}
          <div className="searchHeader">
            <h2>계정 찾기</h2>
            {/* 아이디 찾기, 비밀번호 찾기 링크 */}
          </div>
          <div className="searchTabWrapper">
            <div className={`searchTab ${location.pathname === "/findId" ? "active" : ""}`}>
              <a href="/findId">아이디 찾기</a>
            </div>
            <div className={`searchTab ${location.pathname === "/findPwd" ? "active" : ""}`}>
              <a href="/findPwd">비밀번호 찾기</a>
            </div>
          </div>

          {/* 옵션 리스트 */}
          <div className="searchContentWrapper">
            <ul>
              <div className="searchContent">
                <li>
                  <div className="searchContentHeader">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedOption === "phone"}
                        onChange={() => handleOptionSelect("phone")}
                      />
                      휴대폰 번호로 찾기
                    </label>
                  </div>
                  {selectedOption === "phone" && (
                    <div className="searchContentInner">
                      <p>입력하신 이름과 휴대폰 번호가 회원 정보와 일치한 경우 인증번호가 발송돼요.</p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (isPhoneCodeSent) {
                            checkPhoneNum();
                          } else {
                            requestPhoneVerificationCode();
                          }
                        }}
                      >
                        <div className="inputStyle">
                          <label>
                            <input
                              type="text"
                              placeholder="이름"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        <div className="inputStyle">
                          <label>
                            <input
                              type="text"
                              placeholder="휴대폰 번호"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        {isPhoneCodeSent && (
                          <div>
                            <label>
                              인증번호:
                              <input
                                type="text"
                                value={verificationPhoneNumber}
                                onChange={handlePhoneVerificationChange}
                                placeholder="인증번호"
                              />
                            </label>
                          </div>
                        )}
                        <div className="btnWrap">
                          <button type="submit" className="submitBtn">{isPhoneCodeSent ? "인증번호 확인" : "인증번호받기"}</button>
                        </div>
                      </form>
                    </div>
                  )}
                </li>
              </div>

              <div className="searchContent">
                <li>
                  <div className="searchContentHeader">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedOption === "email"}
                        onChange={() => handleOptionSelect("email")}
                      />
                      이메일로 찾기
                    </label>
                  </div>
                  {selectedOption === "email" && (
                    <div className="searchContentInner">
                      <p>입력하신 이름과 이메일 주소가 회원 정보와 일치한 경우 인증번호가 발송돼요.</p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (isEmailCodeSent) {
                            getIdByEmail();
                          } else {
                            requestEmailVerificationCode();
                          }
                        }}
                      >
                        <div className="inputStyle">
                          <label>
                            <input
                              type="text"
                              placeholder="이름"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        <div className="inputStyle">
                          <label>
                            <input
                              type="text"
                              placeholder="이메일 주소"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        {isEmailCodeSent && (
                          <div className="inputStyle">
                            <label>
                              <input
                                type="text"
                                value={verificationEmailCode}
                                onChange={handleEmailVerificationChange}
                                placeholder="인증번호"
                              />
                            </label>
                          </div>
                        )}
                        <div className="btnWrap">
                          <button type="submit" className="submitBtn">{isEmailCodeSent ? "인증번호 확인" : "인증번호받기"}</button>
                        </div>
                      </form>
                    </div>
                  )}
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div >
    </>
  );
};

export default FindId;
