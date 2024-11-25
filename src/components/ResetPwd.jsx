import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPwd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {}; 


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
    <div>
      {/* 최상단 뒤로가기 버튼 */}
      <button onClick={() => navigate("/login")}>←</button>

      {/* 아이디 찾기, 비밀번호 찾기 링크 */}
      계정 찾기
      <div>
        <a href="/findId">아이디 찾기</a> | <a href="/findPwd">비밀번호 찾기</a>
      </div>

      <h1>인증이 완료되었어요</h1>
      <h1>비밀번호를 재설정 해주세요</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID</label>
          <input type="text" readOnly value={id} />
        </div>

        <div>
          <label>새 비밀번호</label>
          <input 
            type="password" 
            placeholder="새 비밀번호" 
            required
            value={pwd} 
            onChange={(e) => setPwd(e.target.value)} 
          />
        </div>

        <div>
          <label>새 비밀번호 확인</label>
          <input 
            type="password" 
            placeholder="새 비밀번호 확인" 
            required
            value={pwdCheck} 
            onChange={(e) => setPwdCheck(e.target.value)} 
          />
          {error && <div style={{color: 'red'}}>{error}</div>}
        </div>

        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default ResetPwd;
