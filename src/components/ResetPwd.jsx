import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNa from './MainNa';
import "../assets/css/FindId.css";

const ResetPwd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (location.pathname === "/resetPwd") {
      setSelectedOption("phone");
    }
  }, [location.pathname]);


  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    setError('');


    if (pwd !== pwdCheck) {
      setError('비밀번호가 일치하지않습니다');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/members/updatepassword", {
        id: id,
        pwd: pwd,
      });

      if (response.data.message === "success") {
        navigate("/login");
      } else {
        alert("회원 정보수정중 오류발생");
      }
    } catch (error) {
      alert("오류발생 다시수정해주세요", error);
    }
  };

  return (
    <>
      <MainNa />
      <div className="searchContainer">
        {/* 최상단 뒤로가기 버튼
      <button onClick={() => navigate("/login")}>←</button> */}

        {/* 아이디 찾기, 비밀번호 찾기 링크 */}
        <div className="searchIdWrapper">
          <div className="searchHeader">
            <h2>계정 찾기</h2>

            <div className="searchTabWrapper">
            <div className={`searchTab ${location.pathname === "/findId" ? "active" : ""}`}>
              <a href="/findId">아이디 찾기</a>
            </div>
            <div className={`searchTab ${location.pathname === "/resetPwd" ? "active" : ""}`}>
              <a href="/findPwd">비밀번호 찾기</a>
            </div>
          </div>

          <div className="searchPwdHeader">
            <h3>인증이 완료되었어요</h3>
            <h3>비밀번호를 재설정 해주세요</h3>
          </div>

          <div className="searchResetPwdContent">
            <form onSubmit={handleSubmit}>
              <div className="inputResetPwdStyle">
                <input type="text" readOnly value={id} />
              </div>
              <div className="inputResetPwdStyle">
                <input
                  type="password"
                  placeholder="새 비밀번호"
                  required
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
              <div className="inputResetPwdStyle">
                <input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  required
                  value={pwdCheck}
                  onChange={(e) => setPwdCheck(e.target.value)}
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
              </div>
              <div className="btnPwdWrap">
              <button type="submit" className='submitResetPwdBtn'>확인</button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPwd;
