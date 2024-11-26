import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
  import "../assets/css/FindId.css";
import MainNa from "./MainNa";

const FindPwd = () => {
  const [id, setId] = useState(""); 
  const navigate = useNavigate(); 
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (location.pathname === "/findPwd") {
      setSelectedOption("phone");
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:8080/api/members/checkId", {
        id: id,
      });
      if (response.data.message === "exist") {
        navigate("/findPwdDetail", { state: { id } });
      } else {
        alert("존재하지않는 아이디입니다");
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
    </>
  );
};

export default FindPwd;
