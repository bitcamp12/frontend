import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import '../assets/css/FindIdDetail.css';
import '../assets/css/FindId.css';
import MainNa from "./MainNa";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";

const FindPwdDetail = () => {

  const [alertVisible, setAlertVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const closeModal = () => {
      setAlertVisible(false);
  };

  const location = useLocation();
  const { id } = location.state;


  const navigate = useNavigate();

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
    if (location.pathname === "/findPwdDetail") {
      setSelectedOption("phone");
    }
  }, [location.pathname]);

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
    setAlertVisible(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/members/sendPhoneVerificationCode`,
        {
          id:id,
          name: formData.name,
          phoneNum: formData.phone
        }
      )
      if (response.data.status === 200) {
        setModalMessage("인증번호가 휴대폰으로 전송되었습니다.");
        setIsPhoneCodeSent(true);
        setPhoneTimer(60);
        setIsPhoneExpired(false);
        setTimeout(() => {
          setAlertVisible(false);
        }, 5000);  // 2초 뒤에 꺼짐
        
      } else {
        
        setModalMessage("일치하는 회원정보가 없습니다.");
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
        
      }
    } catch (error) {
      console.error("에러", error);
      setModalMessage("서버와의 연결에 오류가 발생했습니다.");
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);  // 2초 뒤에 꺼짐
      
    }
  };

  const checkPhoneNum = async () => {
    setAlertVisible(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/members/checkPhone`,
        {
          name: formData.name,
          phoneNum: formData.phone,
          code: verificationPhoneNumber,
        },
        {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          },
        }
      );
      if (response.data.status === 200) {
        
        setModalMessage("인증성공! 비밀번호 재설정 페이지로 이동됩니다");

        setTimeout(() => {
          localStorage.setItem("id",id);
          navigate("/resetPwd");
        }, 2000);  // 2초 뒤에 



      } else {
        setModalMessage("인증번호가 일치하지않습니다.");

        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
        
      }
    } catch (error) {
      console.error("에러", error);
      setModalMessage("서버오류가 발생하였습니다.");

      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);  // 2초 뒤에 꺼짐
      
    }
  };

  const requestEmailVerificationCode = async () => {
    setAlertVisible(true);
    setModalMessage("인증번호 발송중입니다. 잠시만 기다려주세요");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/members/sendEmailVerificationCode`,
        {
          name: formData.name,
          email: formData.email,
        },
        {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          },
        }
      );
      if (response.data.status === 200) {
        setModalMessage("인증번호가 이메일로 전송되었습니다.");
        setIsEmailCodeSent(true);
        setEmailTimer(60);
        setIsEmailExpired(false);
        setTimeout(() => {
          setAlertVisible(false);
        }, 5000);  // 2초 뒤에 꺼짐
        
      } else if (response.data.status === 400) {
        setModalMessage("일치하는 회원이 없습니다.");
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
        
      } else {
        setModalMessage("이메일 발송에 실패하였습니다.");
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
        
      }
    } catch (error) {
      console.error("에러", error);
      setModalMessage("서버와의 연결에 문제가 발생하였습니다.");
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);  // 2초 뒤에 꺼짐
      
    }
  };


  const checkEmailNum = async () => {
    setAlertVisible(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/members/verifyCodeId`,

        {
          name: formData.name,
          email: formData.email,
          code: verificationEmailCode,
        },

        {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          },
        }
      );
      if (response.data.status === 200) {
        
        setModalMessage("인증성공! 비밀번호 재설정 페이지로 이동됩니다");

        setTimeout(() => {
          localStorage.setItem("id",id);
          navigate("/resetPwd");
        }, 2000);  // 2초 뒤에 

      } else if (response.data.status === 204) {
        setModalMessage("인증번호가 일치하지않습니다.");

        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);  // 2초 뒤에 꺼짐
        
      }
    } catch (error) {
      console.error("에러", error);
      setModalMessage("서버오류가 발생하였습니다.");

      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);  // 2초 뒤에 꺼짐
      
    }
  };


  return (
    <>
      <MainNa />
      <div className="searchIdContainer">
        <div className="searchIdWrapper">
          <div className="searchIdHeader">
            {/* 최상단 뒤로가기 버튼 */}
            {/* <button onClick={() => navigate("/login")}>←</button> */}

            {/* 아이디 찾기, 비밀번호 찾기 링크 */}
            <div className="searchIdHeader">
              <h2>계정 찾기</h2>
            </div>
            <div className="searchTabIdWrapper">
              <div className={`searchTab ${location.pathname === "/findIdDetail" ? "active" : ""}`}>
                <Link to="/findId">아이디 찾기</Link>
              </div>
              <div className={`searchTab ${location.pathname === "/findPwdDetail" ? "active" : ""}`}>
                <Link to="/findPwd">비밀번호 찾기</Link>
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
                            <>
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
                              <div className="timeLeft">남은 시간: {isPhoneExpired ? "만료됨" : `${phoneTimer}초`}</div>
                            </>
                          )}
                          <div className="btnPwdDetailWrap">
                            <button type="button" className="resubmitBtn" onClick={requestPhoneVerificationCode}>다시 받기</button>
                            <button type="submit" className="getNumBtn">{isPhoneCodeSent ? "인증번호 확인" : "인증번호받기"}</button>
                          </div>
                          <div>
                          </div>
                        </form>
                      </div>
                    )}
                  </li>

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
                        {selectedOption === "email" && (
                          <div className="searchContentInner">
                            <p>입력하신 이름과 이메일 주소가 회원 정보와 일치한 경우 인증번호가 발송돼요.</p>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (isEmailCodeSent) {
                                  checkEmailNum();

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
                                <>
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
                                  <div className="timeLeft">남은 시간: {isEmailExpired ? "만료됨" : `${emailTimer}초`}</div>
                                </>
                              )}
                              <div className="btnPwdDetailWrap">
                                <button type="button" className="resubmitBtn" onClick={requestEmailVerificationCode}>다시 받기</button>
                                <button type="submit" className="getNumBtn">{isEmailCodeSent ? "인증번호 확인" : "인증번호받기"}</button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    </li>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal 
                closeModal={closeModal} 
                modalMessage={modalMessage} 
                modalTitle={modalTitle} 
                alertVisible={alertVisible} 
            />                  

    </>
  );
};

export default FindPwdDetail;
