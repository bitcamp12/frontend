import React from 'react';
import { Navigate } from 'react-router';

const FindPwd = () => {
    return (
 
      <div>
      {/* 최상단 뒤로가기 버튼 */}
      <button onClick={() => Navigate("/login")}>←</button>


     
      {/* 아이디 찾기, 비밀번호 찾기 링크 */}
      계정 찾기
      <div>
        <a href="/findId">아이디 찾기</a> | <a href="/findPwd">비밀번호 찾기</a>
      </div>
        </div>
    );
};

export default FindPwd;