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
    const [selectedIcon, setSelectedIcon] = useState("memberInfo");

    const funcSelectedIcon = (iconName) => {
        setSelectedIcon(iconName);
    };
    //
    const [password, setPassword] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const handlePasswordChange = (event) => {
        setPassword(event.target.value); // 비밀번호 입력 처리
    };
    // 확인버튼을 누르면 비밀번호를 비교한다.
    const accessToken = localStorage.getItem("token"); // 로컬스토리지
    const [correctPassword, setCorrectPassword] = useState(""); // 실제 비밀번호로 교체 필요
    const checkPassword = async () => {
        //백엔드에서 비밀번호 확인을 해야 합니다.
        await axios
            .get(`${process.env.REACT_APP_API_URL}/members/checkPassword`, {
                params: {
                    pwd: password,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            })
            .then((response) => {
                setIsPasswordCorrect(response.data);
            })
            .catch((error) => console.log(error));
    };

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

                {/* <div className={styles.member_info_container}>
                    {<InfoLock />}
                    {selectedIcon === "memberInfo" && <InfoModify />}
                    {selectedIcon === "reservationDetail" && (
                        <InfoReservation />
                    )}
                    {selectedIcon === "bookmark" && <InfoBookmark />}
                    {selectedIcon === "withdrawal" && <InfoWithdrawal />}
                </div> */}
                <div className={styles.member_info_container}>
                    {!isPasswordCorrect ? (
                        <InfoLock
                            password={password}
                            handlePasswordChange={handlePasswordChange}
                            checkPassword={checkPassword}
                        />
                    ) : (
                        <>
                            {selectedIcon === "memberInfo" && <InfoModify />}
                            {selectedIcon === "reservationDetail" && (
                                <InfoReservation />
                            )}
                            {selectedIcon === "bookmark" && <InfoBookmark />}
                            {selectedIcon === "withdrawal" && (
                                <InfoWithdrawal />
                            )}
                        </>
                    )}
                </div>
            </section>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Infomation;
