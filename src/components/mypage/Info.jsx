import React, { useState } from "react";

import Icon from "./Icon";
import styles from "../../assets/css/mypage/Info.module.css";
import MainNa from "../MainNa";
import Footer from "../Footer";

const Info = () => {
    const [pwd, setPwd] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");

    const funcSelectedIcon = (iconName) => {
        setSelectedIcon(iconName);
    };

    return (
        <div>
            <div><MainNa/></div>
            <section>
                <nav className={styles.member_info_nav}>
                    <ul>
                        <li onClick={() => funcSelectedIcon("memberInfo")}>
                            <Icon name="memberInfo" size={10} color="red" />
                            <span>회원정보수정</span>
                        </li>
                        <li onClick={() => funcSelectedIcon("memberPwd")}>
                            <Icon name="memberPwd" size={10} color="red" />
                            <span>비밀번호변경</span>
                        </li>
                        <li onClick={() => funcSelectedIcon("deliveryAddr")}>
                            <Icon name="deliveryAddr" size={10} color="red" />
                            <span>배송지관리</span>
                        </li>
                        <li
                            onClick={() =>
                                funcSelectedIcon("reservationDetail")
                            }
                        >
                            <Icon
                                name="reservationDetail"
                                size={10}
                                color="red"
                            />
                            <span>예매내역</span>
                        </li>
                        <li onClick={() => funcSelectedIcon("bookmark")}>
                            <Icon name="bookmark" size={10} color="red" />
                            <span>즐겨찾기</span>
                        </li>
                        <li onClick={() => funcSelectedIcon("")}>
                            <Icon name="" size={10} color="red" />
                            <span>계정관리</span>
                        </li>
                        <li onClick={() => funcSelectedIcon("withdrawal")}>
                            <Icon name="withdrawal" size={10} color="red" />
                            <span>회원탈퇴</span>
                        </li>
                    </ul>
                </nav>

                <div className={styles.member_info_modify}>
                    <h3>비밀번호 인증</h3>
                    <div className={styles.notice}>
                        <Icon name="shieldLock" size={50} color="#676764" />
                        <p>
                            정보를 안전하게 보호하기 위해
                            <br />
                            <span>비밀번호를 다시 한 번 확인</span>
                            합니다.
                        </p>
                        <p>
                            비밀번호가 타인에게 노출되지 않도록 항상
                            주의해주세요
                        </p>
                    </div>
                    <form id="checkPwdForm">
                        <div>
                            <input
                                type="text"
                                name="IconVal"
                                value={selectedIcon}
                            />
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
            </section>
            <div><Footer/></div>
        </div>
    );
};

export default Info;
