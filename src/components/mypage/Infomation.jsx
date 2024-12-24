import React, { useEffect, useState } from "react";
import styles from "../../assets/css/mypage/Infomation.module.css";

import Icon from "./Icon";
import MainNa from "../MainNa";
import Footer from "../Footer";
import InfoLock from "./InfoLock";
import InfoModify from "./InfoModify";
import InfoWithdrawal from "./InfoWithdrawal";
import InfoReservation from "./InfoReservation";
import InfoBookmark from "./InfoBookmark";
import axios from "axios";
import { Link } from "react-router-dom";

const Infomation = () => {
    const [selectedIcon, setSelectedIcon] = useState("");

    const funcSelectedIcon = (iconName) => {
        setSelectedIcon(iconName);
    };

    // const [sessionId, setSessionId] = useState("");
    //
    // // 로그인한 세션을 가져오기 (지워야함. )
    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8080/api/members/getSession", {
    //             withCredentials: true, // 세션을 포함한 요청
    //         })
    //         .then((response) => {
    //             console.log("data: " + response.data.data);
    //             setSessionId(response.data.data);
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

    return (
        <div className={styles.member_info_body}>
            <div>
                <MainNa />
            </div>
            <section className={styles.member_info_section}>
                <nav className={styles.member_info_nav}>
                    <ul>
                        <li
                            onClick={() => funcSelectedIcon("memberInfo")}
                            className={
                                selectedIcon === "memberInfo"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            <Icon name="memberInfo" size={10} color="red" />
                            <span>회원정보수정</span>
                        </li>
                        {/* <li
                            onClick={() => funcSelectedIcon("memberPwd")}
                            className={
                                selectedIcon === "memberPwd"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            <Icon name="memberPwd" size={10} color="red" />
                            <span>비밀번호변경</span>
                        </li> */}
                        {/* <li
                            onClick={() => funcSelectedIcon("deliveryAddr")}
                            className={
                                selectedIcon === "deliveryAddr"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            <Icon name="deliveryAddr" size={10} color="red" />
                            <span>배송지관리</span>
                        </li> */}
                        <li
                            onClick={() =>
                                funcSelectedIcon("reservationDetail")
                            }
                            className={
                                selectedIcon === "reservationDetail"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            <Icon
                                name="reservationDetail"
                                size={10}
                                color="red"
                            />
                            <span>예매내역</span>
                        </li>
                        <li
                            onClick={() => funcSelectedIcon("bookmark")}
                            className={
                                selectedIcon === "bookmark"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            <Icon name="bookmark" size={10} color="red" />
                            <span>즐겨찾기</span>
                        </li>
                        {/* <li
                            onClick={() => funcSelectedIcon("")}
                            className={
                                selectedIcon === "" ? styles.selected : ""
                            }
                        >
                            <Icon name="memberInfo" size={10} color="red" />
                            <span>계정관리</span>
                        </li> */}
                        <li
                            onClick={() => funcSelectedIcon("withdrawal")}
                            className={
                                selectedIcon === "withdrawal"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            <Icon name="withdrawal" size={10} color="red" />
                            <span>회원탈퇴</span>
                        </li>
                    </ul>
                </nav>

                <div className={styles.member_info_container}>
                    { <InfoLock />}
                    {selectedIcon === "memberInfo" && <InfoModify />}
                    {selectedIcon === "reservationDetail" && (
                        <InfoReservation />
                    )}
                    {selectedIcon === "bookmark" && <InfoBookmark />}
                    {selectedIcon === "withdrawal" && <InfoWithdrawal />}
                </div>
            </section>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Infomation;
