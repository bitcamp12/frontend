import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const FindId = () => {
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
  const requestPhoneVerificationCode = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/members/sendPhoneVerificationCode?name=${formData.name}&phone=${formData.phone}`
      );
      if (response.data.status === 200) {
        alert("인증번호가 휴대폰으로 전송되었습니다.");
        setIsPhoneCodeSent(true); 
      } else {
        alert("휴대폰 인증번호 전송 실패.");
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
      alert("서버와의 연결에 문제가 발생했습니다.");
    }
  };

  const requestEmailVerificationCode = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/members/sendEmailVerificationCode?name=${formData.name}&email=${formData.email}`);
      if (response.data.status === 200) 
        {
        alert("인증번호가 이메일로 전송되었습니다.");
        setIsEmailCodeSent(true); 
      }
      else if(response.data.status ===400)
        {
        alert("일치하는 회원이없습니다");
      }
       else {
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
        alert(`회원님의 ID는: ${response.data.message}`);
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
        alert(`회원님의 ID는: ${response.data.message}`);
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
    <div>
      {/* 최상단 뒤로가기 버튼 */}
      <button onClick={() => Navigate("/login")}>←</button>

      {/* 아이디 찾기, 비밀번호 찾기 링크 */}
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
                  getIdByEmail(); 
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

export default FindId;
