import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
  import "../assets/css/FindId.css";
import MainNa from "./MainNa";
import Modal from "./Modal/Modal";

const FindPwd = () => {
  const [id, setId] = useState(""); 
  const navigate = useNavigate(); 
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const closeModal = () => {
      setAlertVisible(false);
  };

  useEffect(() => {
    if (location.pathname === "/findPwd") {
      setSelectedOption("phone");
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    setModalMessage("아이디 검색중입니다. 잠시만 기다려주세요.");
    setAlertVisible(true);
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:8080/api/members/checkId", {
        id: id,
      });
      if (response.data.message === "exist") {
        setModalMessage("아이디가 존재합니다 인증을 진행해주세요.");

        setTimeout(() => {
          navigate("/findPwdDetail", { state: { id } });
        }, 1500);  //1.5초뒤에 이동

      } else {
        setAlertVisible(true);
        setModalMessage("존재하지 않는 아이디입니다.");

        setTimeout(() => {
          setAlertVisible(false);
        }, 1000);

      }
    } catch (error) {
      console.error("", error);
    }
  };

  return (
    <>
    <MainNa />
    <div className="searchContainer">
      {/* <button onClick={() => navigate("/login")}>←</button> */}
      <div className="searchIdWrapper">
        <div className="searchHeader">
        <h2>계정 찾기</h2>
        </div>

        <div className="searchTabWrapper">
            <div className={`searchTab ${location.pathname === "/findId" ? "active" : ""}`}>
              <a href="/findId">아이디 찾기</a>
            </div>
            <div className={`searchTab ${location.pathname === "/findPwd" ? "active" : ""}`}>
              <a href="/findPwd">비밀번호 찾기</a>
            </div>
          </div>

        <div className="searchPwdHeader">
          <h3>아이디 확인 후</h3>
          <h3>비밀번호를 재설정 할 수 있어요</h3>
        </div>

        <div className="searchPwdContent">
        <form onSubmit={handleSubmit}>
          <div className="inputPwdStyle">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)} 
            placeholder="아이디 입력"
          />
          </div>
          <div className="btnPwdWrap">
          <button type="submit" className="submitPwdBtn">아이디 확인</button>
          </div>
        </form>
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

export default FindPwd;
