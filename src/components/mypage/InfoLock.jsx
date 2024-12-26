import React, { useEffect, useState } from "react";

import styles from "../../assets/css/mypage/InfoLock.module.css";

import Icon from "./Icon";
import axios from "axios";

const InfoLock = ({ password,setPassword ,handlePasswordChange, checkPassword }) => {
    const [selectedIcon, setSelectedIcon] = useState("");
    // 비밀번호 맞추면 Infomation.jsx로 보내야함

    // const [pwd, setPwd] = useState("");

    // const funcSelectedIcon = (iconName) => {
    //     setSelectedIcon(iconName);
    // };
    const [loginId, setloginId] = useState("");
    const accessToken = localStorage.getItem("token");
    
useEffect(()=>{
    axios
    .get(`${process.env.REACT_APP_API_URL}/members/id`, {
      headers: {
        'Authorization': `Bearer ${accessToken}` // 토큰을 Authorization 헤더에 포함
    },
    withCredentials: true, // 리프레시 토큰을 쿠키로 보내기 위한 설정
    })
    .then((response) => {
      console.log(response);
      console.log("현재 사용자 : ", response.data);
      if(response.data.status == 200){
        setloginId(response.data.data.id);
        if(response.data.data.id == response.data.data.password){
            setPassword(response.data.data.password);
        }
      }else{
        setloginId('');
      }
    })
    .catch((e) => {
      console.log(e);
      setloginId('');
    })
  },[])





    return (
        <div className={styles.member_info_lock}>
            <h3>비밀번호 인증</h3>
            <div className={styles.notice}>
                <Icon name="shieldLock" size={50} color="#676764" />
                <p>
                    정보를 안전하게 보호하기 위해
                    <br />
                    <span>비밀번호를 다시 한 번 확인</span>
                    합니다.
                </p>
                <p>비밀번호가 타인에게 노출되지 않도록 항상 주의해주세요</p>
            </div>
            <form id="checkPwdForm">
                <div className={styles.checkPwdContainer}>
                    <div>
                        <input
                            type="hidden"
                            name="IconVal"
                            value={selectedIcon}
                        />
                    </div>
                    <div>
                        <label htmlFor="pwd">비밀번호</label>
                        <input
                            type="password"
                            name="pwd"
                            id="pwd"
                            value={password}
                            placeholder="비밀번호"
                            onChange={handlePasswordChange}
                        />
                    </div>
                </div>
                <div className={styles.btnWrap}>
                    <button className={styles.whiteBtn}>취소</button>
                    <button
                        onClick={checkPassword}
                        className={styles.violetBtn}
                    >
                        확인
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InfoLock;
