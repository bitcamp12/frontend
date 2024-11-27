import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import auth from '../assets/images/authimage.png';
import MainNa from "./MainNa";

import "../assets/css/FindIdDetail.css";
import Modal from "./Modal/Modal";


const FindIdDetail = () => {

  const [alertVisible, setAlertVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const closeModal = () => {
      setAlertVisible(false);
  };

  const [userId, setUserId] = useState(null);
  const location = useLocation();

   useEffect(() => {
     const id = sessionStorage.getItem("userId");
     if (id) {
       setUserId(id);
     } else {
      setAlertVisible(true);
      setModalMessage("아이디 찾기를 진행해주세요");
     }

     return () => {
       sessionStorage.removeItem("userId");
     };
 }, []);

  return (
    <>
      <MainNa />
      <div className="searchIdContainer">
        <div className="searchIdWrapper">
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
          
          <div className="searchContentIdWrapper">
            <ul>
              <div className="searchContentIdHeader">
                <h3>고객님의</h3>
                <h3>아이디를 찾았어요</h3>
              </div>
              <div className="searchContentIdLabel">
                <div className="searchContentIdContent">
                  <label>
                    <input type="radio" checked={!!userId} readOnly />
                    {userId ? userId : "아이디 찾기를 해주세요"}
                  </label>
                </div>
                <div className="searchContentIdIcon">
                  <img src={auth} alt="auth" width="50px" className="logo" />
                </div>
              </div>
            </ul>
          </div>

          <div className="btnWrap">
            <Link to="/findPwd">
              <button className="whiteBtn">비밀번호 찾기</button>
            </Link>
            <Link to="/login">
              <button className="violetBtn">로그인</button>
            </Link>
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

export default FindIdDetail;
