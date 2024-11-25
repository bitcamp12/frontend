import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from '../assets/images/authimage.png';

const FindIdDetail = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) {
      setUserId(id);
    } else {
      alert("ID 찾기를 진행해주세요.");
    }

    return () => {
      sessionStorage.removeItem("userId");
    };
  }, []);

  return (
    <div>
      <h1>계정 찾기</h1>
      <div>
        <Link to="/findId">아이디 찾기</Link> | <Link to="/findPwd">비밀번호 찾기</Link>
      </div>
      <ul>
        <p>고객님의</p>
        <p>아이디를 찾았어요</p>
        <div className="id">
          <label>
            <input type="radio" checked={!!userId} readOnly />
            {userId ? userId : "아이디 찾기를 해주세요"}
          </label>
        </div>
        <div className="icon">
          <img src={auth} alt="auth" width="50px" className="logo" />
        </div>
      </ul>

      <div>
        <Link to="/findPwd">
          <button>비밀번호 찾기</button>
        </Link>
        <Link to="/login">
          <button>로그인</button>
        </Link>
      </div>
    </div>
  );
};

export default FindIdDetail;
