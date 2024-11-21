import React, { useState } from "react";

import styles from "../../assets/css/mypage/InfoLock.module.css";

import Icon from "./Icon";

const InfoLock = () => {
    const [pwd, setPwd] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");

    const funcSelectedIcon = (iconName) => {
        setSelectedIcon(iconName);
    };

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
                <div>
                    <input type="text" name="IconVal" value={selectedIcon} />
                </div>
                <div>
                    <label htmlFor="id">아이디</label>
                    <input
                        type="text"
                        name="id"
                        id="id"
                        value="아이디값"
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="pwd">비밀번호</label>
                    <input
                        type="password"
                        name="pwd"
                        id="pwd"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                </div>
                <div className={styles.btnWrap}>
                    <button className={styles.whiteBtn}>취소</button>
                    <button className={styles.violetBtn}>확인</button>
                </div>
            </form>
        </div>
    );
};

export default InfoLock;
