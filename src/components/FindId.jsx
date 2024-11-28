import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MainNa from "./MainNa";

import "../assets/css/FindId.css";
import Modal from "./Modal/Modal";

const FindId = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [alertVisible, setAlertVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const closeModal = () => {
    setAlertVisible(false);
  };


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
    setModalMessage("인증번호 발송중입니다. 잠시만 기다려주세요");
    setAlertVisible(true);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/members/sendPhoneVerificationCode',
        {
          name: formData.name,
          phoneNum: formData.phone
        }
      )
      if (response.data.status === 200) {
        setIsPhoneCodeSent(true);
        setPhoneTimer(60);
        setIsPhoneExpired(false);
        setModalMessage("인증번호가 휴대폰으로 전송되었습니다.");

        setTimeout(() => {
          setAlertVisible(false);
        }, 5000);  // 5초 뒤에 꺼짐

      } else {
        setModalMessage("일치하는 회원 정보가 없습니다.");

        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
        
      }
    } catch (error) {
      console.error("에러", error);
      setModalMessage("서버와의 연결에 문제가 발생했습니다.");

      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);  // 2초 뒤에 꺼짐

    }
  };

  const checkPhoneNum = async () => {
    setAlertVisible(true);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/members/checkPhone',
        {
          name: formData.name,
          phoneNum: formData.phone,
          code: verificationPhoneNumber,
        }
      );
      if (response.data.status === 200) {
        getIdByPhone();
      } else {
        setModalMessage("인증번호가 일치하지않습니다");
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
      }
    } catch (error) {
      console.error("에러", error);
      setModalMessage("서버 오류");
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);  // 2초 뒤에 꺼짐
    }
  };

  const requestEmailVerificationCode = async () => {
    setModalMessage("인증번호 발송중입니다. 잠시만 기다려주세요");
    setAlertVisible(true);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/members/sendEmailVerificationCode',
        {
          name: formData.name,
          email: formData.email,
        }
      );
      if (response.data.status === 200) {
        setIsEmailCodeSent(true);
        setEmailTimer(60);
        setIsEmailExpired(false);
        setModalMessage("이메일로 인증번호가 전송 발송되었습니다. 확인해주세요");
        setTimeout(() => {
          setAlertVisible(false);
        }, 5000);  // 5초 뒤에 꺼짐
      } else if (response.data.status === 400) {
        setModalMessage("일치하는 회원이 없습니다.");
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
      } else {
        setModalMessage("이메일 인증번호 전송이 실패하였습니다.");
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
      }
    } catch (error) {
      console.error("에러", error);
      setModalMessage("서버에 문제가 있습니다.");
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);  // 2초 뒤에 꺼짐
    }
  };

  const getIdByPhone = async () => {
    setModalMessage("");
    setAlertVisible(true);
    try {
      const response = await axios.post("http://localhost:8080/api/members/getIdByPhone", {
        phone: formData.phone,
        name: formData.name,
      });

      if (response.data.status === 200) {
        sessionStorage.setItem("userId", response.data.message);

        setModalMessage("인증 성공! 잠시후 이동합니다..");

        setTimeout(() => {
          navigate("/findIdDetail");
        }, 2000);  // 2초 뒤에 이동
      

      } else if (response.data.status === 404) {
        setModalMessage("회원정보가 없습니다");
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
      } else {
        setModalMessage("오류 발생");
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
      }
    } catch (error) {
      console.error("에러", error);
      setModalMessage("서버에 문제가 있습니다.");
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);  // 2초 뒤에 꺼짐
    }
  };

  const getIdByEmail = async () => {
    setModalMessage("");
    setAlertVisible(true);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/members/verifyCodeId',
        {
          name: formData.name,
          email: formData.email,
          code: verificationEmailCode,
        }
      );

      if (response.data.status === 200) {
        sessionStorage.setItem("userId", response.data.message);
        setModalMessage("인증 성공! 잠시후 이동합니다.");

                setTimeout(() => {
          navigate("/findIdDetail");
        }, 2000);  // 2초 뒤에 이동

      } else if (response.data.status === 204) {
        setModalMessage("인증번호가 일치하지않습니다");
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
      } else {
        setModalMessage("오류 발생");
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
      }
    } catch (error) {
      console.error("에러", error);
      setModalMessage("이메일 인증을 다시 해주세요");
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);  // 2초 뒤에 꺼짐
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
                          <div className="inputStyle">
                            <label>
                              <input
                                type="text"
                                value={verificationPhoneNumber}
                                onChange={handlePhoneVerificationChange}
                                placeholder="인증번호"
                              />
                            </label>
                          </div>
                        )}
                        <div>
                          {isPhoneCodeSent ? (
                            <div className="authentifyWrapper">
                              <div className="timeLeft">
                                남은 시간: {isPhoneExpired ? "만료됨" : `${phoneTimer}초`}
                              </div>
                              <div className="btnWrapFindId">
                                <button
                                  type="button"
                                  className="resubmitBtn"
                                  onClick={() => {
                                    setIsPhoneCodeSent(false); // 기존 상태 초기화
                                    requestPhoneVerificationCode(); // 인증번호 다시 요청
                                  }}
                                >
                                  다시받기
                                </button>
                                <button
                                  type="submit"
                                  className={`submitBtnFindId ${isPhoneCodeSent ? 'no-margin' : ''}`}
                                >
                                  {isPhoneCodeSent ? "인증번호 확인" : "인증번호받기"}
                                </button>
                              </div>
                            </div>
                          ) : null}
                          <div style={{ justifyContent: 'center', display: 'flex' }}>
                            <button
                              type="submit"
                              className="submitBtnFindId"
                              style={{ display: isPhoneCodeSent ? 'none' : 'block', margin: '10px 0', marginLeft: '20px' }}
                            >
                              {isPhoneCodeSent ? null : "인증번호받기"}
                            </button>
                          </div>
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

                        <div>
                          {isEmailCodeSent ? (
                            <div className="authentifyWrapper">
                              <div className="timeLeft">
                                남은 시간: {isEmailExpired ? "만료됨" : `${emailTimer}초`}
                              </div>
                              <div className="btnWrapFindId">
                              <button
                                type="button"
                                className="resubmitBtn"
                                onClick={() => {
                                  setIsEmailCodeSent(false); // 기존 상태 초기화
                                  requestEmailVerificationCode(); // 인증번호 다시 요청
                                }}
                              >
                                다시받기
                                </button>
                                <button
                                  type="submit"
                                  className={`submitBtnFindId ${isEmailCodeSent ? 'no-margin' : ''}`}
                                >
                                  {isPhoneCodeSent ? "인증번호 확인" : "인증번호받기"}
                                </button>
                              </div>
                            </div>
                          ) : null}
                          <div style={{ justifyContent: 'center', display: 'flex' }}>
                            <button
                              type="submit"
                              className="submitBtnFindId"
                              style={{ display: isEmailCodeSent ? 'none' : 'block', margin: '10px 0', marginLeft: '20px' }}
                            >
                              {isEmailCodeSent ? null : "인증번호받기"}
                            </button>
                          </div>
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

      <Modal
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalTitle={modalTitle}
        alertVisible={alertVisible}
      />

    </>
  );
}


export default FindId;
