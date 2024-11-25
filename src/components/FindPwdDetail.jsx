import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FindPwdDetail = () => {
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
        const response = await axios.post(
            'http://localhost:8080/api/members/checkPhone',
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
        navigate("/resetPwd", { state: { id } });
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
        const response = await axios.post(
            'http://localhost:8080/api/members/sendEmailVerificationCode',
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

  

  return (
    <div>
      {/* 최상단 뒤로가기 버튼 */}
      <button onClick={() => navigate("/login")}>←</button>

      {/* 아이디 찾기, 비밀번호 찾기 링크 */}
      계정 찾기
      <div>
        <a href="/findId">아이디 찾기</a> | <a href="/findPwd">비밀번호 찾기</a>
      </div>

      {/* 옵션 리스트 */}
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              checked={selectedOption === "phone"}
              onChange={() => handleOptionSelect("phone")}
            />
            휴대폰 번호로 찾기
          </label>
          {selectedOption === "phone" && (
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
              <div>
                <label>
                  이름:
                  <input
                    type="text"
                    placeholder="이름"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  휴대폰:
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
                  <div>남은 시간: {isPhoneExpired ? "만료됨" : `${phoneTimer}초`}</div>
                  <button type="button" onClick={requestPhoneVerificationCode}>다시 받기</button>
                </div>
              )}
              <div>
                <button type="submit">{isPhoneCodeSent ? "인증번호 확인" : "인증번호받기"}</button>
              </div>
            </form>
          )}
        </li>

        <li>
          <label>
            <input
              type="checkbox"
              checked={selectedOption === "email"}
              onChange={() => handleOptionSelect("email")}
            />
            이메일로 찾기
          </label>
          {selectedOption === "email" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isEmailCodeSent) {
                    navigate("/resetPwd", { state: { id } });
                } else {
                  requestEmailVerificationCode(); 
                }
              }}
            >
              <div>
                <label>
                  이름:
                  <input
                    type="text"
                    placeholder="이름"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  이메일:
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
                <div>
                  <label>
                    인증번호:
                    <input
                      type="text"
                      value={verificationEmailCode}
                      onChange={handleEmailVerificationChange}
                      placeholder="인증번호"
                    />
                  </label>
                  <button type="button" onClick={requestEmailVerificationCode}>다시 받기</button>
                  <div>남은 시간: {isEmailExpired ? "만료됨" : `${emailTimer}초`}</div>
                </div>
              )}
              <div>
                <button type="submit">{isEmailCodeSent ? "인증번호 확인" : "인증번호받기"}</button>
              </div>
            </form>
          )}
        </li>
      </ul>
    </div>
  );
};

export default FindPwdDetail;
