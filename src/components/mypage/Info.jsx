import React, { useState } from "react";

import Icon from "./Icon";
import styles from "../../assets/css/mypage/Info.module.css";

const Info = () => {
    const [pwd, setPwd] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");

    const funcSelectedIonc = (iconName) => {
        setSelectedIcon(iconName);
    };

    return (
        <div>
            <div>header</div>
            <section>
                <nav className={styles.member_info_nav}>
                    <ul>
                        <li onClick={() => funcSelectedIonc("memberInfo")}>
                            <Icon name="memberInfo" size={10} color="red" />{" "}
                            회원정보수정
                        </li>
                        <li onClick={() => funcSelectedIonc("memberPwd")}>
                            <Icon name="memberPwd" size={10} color="red" />
                            비밀번호변경
                        </li>
                        <li onClick={() => funcSelectedIonc("deliveryAddr")}>
                            <Icon name="deliveryAddr" size={10} color="red" />
                            배송지관리
                        </li>
                        <li
                            onClick={() =>
                                funcSelectedIonc("reservationDetail")
                            }
                        >
                            <Icon
                                name="reservationDetail"
                                size={10}
                                color="red"
                            />
                            예매내역
                        </li>
                        <li onClick={() => funcSelectedIonc("bookmark")}>
                            <Icon name="bookmark" size={10} color="red" />
                            즐겨찾기
                        </li>
                        <li onClick={() => funcSelectedIonc("")}>
                            <Icon name="" size={10} color="red" />
                            계정연결관리
                        </li>
                        <li onClick={() => funcSelectedIonc("withdrawal")}>
                            <Icon name="withdrawal" size={10} color="red" />
                            회원탈퇴
                        </li>
                    </ul>
                </nav>

                <div className={styles.member_info_modify}>
                    <h3>비밀번호 인증</h3>
                    <div>
                        <Icon name="shieldLock" size={20} color="#676764" />
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
                        <div>
                            <button className={styles.cancle}>취소</button>
                            <button className={styles.confirm}>확인</button>
                        </div>
                    </form>
                </div>
            </section>
            <div>footer</div>
        </div>
    );
};

export default Info;
