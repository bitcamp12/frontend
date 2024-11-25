import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FindPwd = () => {
  const [id, setId] = useState(""); 
  const navigate = useNavigate(); 

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
    <div>

      <button onClick={() => navigate("/login")}>←</button>

      <div>
        계정 찾기
        <div>
          <a href="/findId">아이디 찾기</a> | <a href="/findPwd">비밀번호 찾기</a>
        </div>
        <p>아이디가 존재하는지 확인 후</p>
        <p>비밀번호를 재설정 할 수 있어요</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)} 
            placeholder="아이디 입력"
          />
          <button type="submit">아이디 확인</button>
        </form>
      </div>
    </div>
  );
};

export default FindPwd;
