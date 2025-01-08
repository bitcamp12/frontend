import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNa from './MainNa';
import "../assets/css/FindId.css";
import Modal from './Modal/Modal';

const ResetPwd = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const closeModal = () => {
    setAlertVisible(false);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [selectedOption, setSelectedOption] = useState(null); 

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setId(storedId);
    } else {
      setAlertVisible(true);
      setModalMessage("비밀번호 인증을 해주세요");
      setTimeout(() => {
        navigate("/findPwd");
      }, 2000);
    }


    if (location.pathname === "/resetPwd") {
      setSelectedOption("phone");
    }

  }, [location.pathname, navigate]); 

  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (pwd.length < 6) {
      setError('비밀번호는 6자리이상 입력해주세요');
      return;
    }

    if (pwd !== pwdCheck) {
      setError('비밀번호가 일치하지않습니다');
      return;
    }

    setAlertVisible(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/members/updatepassword`, {
        id: id,
        password: pwd,
      });

      if (response.data.message === "success") {
        setModalMessage("회원정보 수정완료! 잠시후 로그인페이지로 이동합니다");

        localStorage.removeItem("id");
        setId(''); 

        setTimeout(() => {
          navigate("/login");  
        }, 2000);  
      } else {
        setModalMessage("입력한 회원 정보에 오류가 있습니다.");
      }
    } catch (error) {
      setModalMessage("회원정보 수정중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <MainNa />
      <div className="searchContainer">
        <div className="searchIdWrapper">
          <div className="searchHeader">
            <h2>계정 찾기</h2>

            <div className="searchTabWrapper">
              <div className={`searchTab ${selectedOption === "phone" ? "active" : ""}`}>
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

      <Modal 
        closeModal={closeModal} 
        modalMessage={modalMessage} 
        modalTitle={modalTitle} 
        alertVisible={alertVisible} 
      />   
    </>
  );
};

export default ResetPwd;
