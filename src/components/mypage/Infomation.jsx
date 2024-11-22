import React, { useState } from "react";
import styles from "../../assets/css/mypage/Infomation.module.css";

import Icon from "./Icon";
import MainNa from "../MainNa";
import Footer from "../Footer";
import InfoLock from "./InfoLock";
import InfoModify from "./InfoModify";
import InfoWithdrawal from "./InfoWithdrawal";
import InfoReservation from "./InfoReservation";
import InfoBookmark from "./InfoBookmark";

const Infomation = () => {
    const [selectedIcon, setSelectedIcon] = useState("");

    const funcSelectedIcon = (iconName) => {
        setSelectedIcon(iconName);
    };

    return (
        <div>
            <div>
                <MainNa />
            </div>
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
                            <Icon name="memberInfo" size={10} color="red" />
                            <span>계정관리</span>
                        </li>
                        <li onClick={() => funcSelectedIcon("withdrawal")}>
                            <Icon name="withdrawal" size={10} color="red" />
                            <span>회원탈퇴</span>
                        </li>
                    </ul>
                </nav>

                <div className={styles.member_info_container}>
                    {/* <InfoLock /> */}
                    {/* <InfoModify /> */}
                    {/* <InfoWithdrawal/> */}
                    {/* <InfoReservation/> */}
                    <InfoBookmark/>
                </div>
            </section>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Infomation;
