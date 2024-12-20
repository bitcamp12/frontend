import React, { useEffect, useState } from "react";
import Icon from "./Icon";

import styles from "../../assets/css/mypage/InfoModify.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

const InfoModify = () => {
    const navigate = useNavigate();

    const [newPhoneNum, setNewPhoneNum] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const validatePhoneNumber = (value) => {
        const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/; // 정규식 : /로 감싼 문자. 또는 new RegExp("")
        return phoneRegex.test(value);
    };
    const validateEmail = (value) => {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return EmailRegex.test(value);
    };

    const [phoneDivMessage, setPhoneDivMessage] = useState("");
    const [emailDivMessage, setEmailDivMessage] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;

        switch (id) {
            case "newPhone":
                setNewPhoneNum(value);
                if (validatePhoneNumber(value)) {
                    setPhoneDivMessage("성공");
                } else {
                    setPhoneDivMessage("입력 형식이 다릅니다.");
                }
                break;
            case "newEmail":
                setNewEmail(value);
                if (validateEmail(value)) {
                    setEmailDivMessage("성공");
                } else {
                    setEmailDivMessage("입력형식이 다릅니다.");
                }
                console.log(validateEmail(value));
                break;
            default:
                break;
        }
    };

    // --체크박스------------
    const [allCheck, setAllCheck] = useState(false);
    const [itemCheck, setCheckItem] = useState({
        smsCheck: false,
        emailCheck: false,
    });
    const handleAllCheck = (e) => {
        const check = e.target.checked;

        setAllCheck(check);
        setCheckItem({
            smsCheck: check,
            emailCheck: check,
        });
    };
    const handleItemCheck = (e) => {
        console.log(e.target.id);
        const { id, checked } = e.target;

        setCheckItem((prev) => {
            const newItemCheck = {
                ...prev,
                [id]: checked,
            };
            setAllCheck(newItemCheck.smsCheck && newItemCheck.emailCheck);
            return newItemCheck;
        });
    };

    // --------------
    const [data, setData] = useState(null);
    const accessToken = localStorage.getItem("token"); // 로컬스토리지===> 전역으로 관리해주고 싶다...   2024.12.18
    useEffect(() => {
        // 세션에서 id를 가져옵니다.
        const userId = "apple"; //sessionStorage.getItem("id");
        // console.log(userId);

        axios
            .get(`http://localhost:8080/api/members/getUserInfo/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true, // 세션 쿠키를 포함
            })
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => console.error("ERROR(사용자정보수정): ", error));
    }, []);

    // ------------
    // --수정 버튼을 누르면 보였다 안보였다--------------
    const [timer, setTimer] = useState(0); // 타이머 초를 0으로 초기화
    const [isTimerActive, setIsTimerActive] = useState(false); // true이면 타이머 작동
    useEffect(() => {
        let interval;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false); // Stop the timer once it reaches 0
        }
        return () => clearInterval(interval); // Cleanup on component unmount or timer stop
    }, [isTimerActive, timer]);
    // 시간을 mm:ss 형식으로 변환하는 함수
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}`;
    };
    // --핸드폰번호수정--
    const [phoneToggle, isPhoneToggle] = useState(false); // false이면 안보이게 하고 싶어요
    const editPhoneBtnToggle = () => {
        isPhoneToggle(!phoneToggle);
    };
    const [phoneAuthToggle, isPhoneAuthToggle] = useState(false);
    const editPhoneAuthBtnToggle = (e) => {
        e.preventDefault();
        isPhoneAuthToggle(!phoneAuthToggle);
        console.log(phoneAuthToggle);
    };
    // --이메일 수정--
    const [emailToggle, isEmailToggle] = useState(false);
    const editEmailBtnToggle = () => {
        isEmailToggle(!emailToggle);
    };
    const [emailAuthToggle, isEmailAuthToggle] = useState(false); // 인증번호 전송
    const editEmailAuthBtnToggle = (e) => {
        e.preventDefault();
        isEmailAuthToggle(!emailAuthToggle);
        console.log(emailAuthToggle);
    };

    useEffect(() => {
        if (newEmail === "") return; // 임시
        else
            axios
                .post("http://localhost:8080/api/members/sendNumber", {
                    params: { email: newEmail },
                })
                .then((response) => {
                    setTimer(3 * 60);
                    setIsTimerActive(true);
                    console.log(response);
                })
                .catch((error) => console.log(error));
    }, [emailAuthToggle]);

    const [emailVerifyCode, setEmailVerifyCode] = useState("");
    const [emailDivVerifyMessage, setEmailDivVerifyMessage] = useState("");
    const checkVerifyNumber = () => {
        axios
            .get("http://localhost:8080/api/members/verifyCode", {
                params: {
                    email: newEmail,
                    code: emailVerifyCode,
                },
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.message === "match") {
                    setEmailDivVerifyMessage("인증번호 일치");
                    //타이머중지
                    setIsTimerActive(false);
                } else if (response.data.message === "not_match") {
                    setEmailDivVerifyMessage("인증번호 일치하지 않습니다.");
                } else {
                    setEmailDivVerifyMessage("오류발생");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const modifyUserInfo = async (data) => {
        const modifiedData = {
            memberSeq: data.memberSeq, // 필수 값
            id: data.id, // 필수 값
            name: data.name, // 필수 값
            password: data.password, // 필수 값
            email: data.email, // 필수 값
            phone: data.phone, // 필수 값
        };
        console.log(modifiedData);

        axios
            .put(
                "http://localhost:8080/api/members/modifyUserInfo",
                modifiedData,
                {
                    headers: {
                        "Content-Type": "application/json", // 요청의 내용이 JSON임을 서버에 알려줍니다.
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                navigate("/");
            })
            .catch();
    };

    if (!data) {
        //
        return <div>No data available</div>;
    }

    return (
        <div className={styles.member_info_modify}>
            <h3>회원정보수정</h3>

            <form id="checkPwdForm" className={styles.checkPwdForm}>
                <div className={styles.member_info_modify_form}>
                    <h5>기본정보</h5>
                    <dl>
                        <dt>아이디</dt>
                        <dd>{data.id}</dd>
                    </dl>
                    <dl>
                        <dt>이름</dt>
                        <dd>
                            <span>{data.name}</span>
                            <a href="" className={styles.whiteBtn}>
                                수정
                            </a>
                        </dd>
                    </dl>
                    <dl>
                        <dt className="editPhone">휴대폰번호</dt>
                        <dd>
                            <span>{data.phone}</span>
                            <a
                                id="editPhoneBtn"
                                className={styles.whiteBtn}
                                onClick={editPhoneBtnToggle}
                            >
                                수정
                            </a>

                            {phoneToggle && (
                                <div
                                    id="editPhoneDiv"
                                    className={styles.modifyEnter}
                                >
                                    <p>
                                        휴대폰번호 변경을 위해 인증이
                                        필요합니다.
                                    </p>
                                    <div>
                                        <div className={styles.enterBox}>
                                            <input
                                                type="text"
                                                id="newPhone"
                                                name="phone"
                                                value={newPhoneNum}
                                                placeholder="변경 휴대폰번호입력 (000-0000-0000)"
                                                onChange={handleChange}
                                            />
                                            <div className={styles.iconWrap}>
                                                <Icon
                                                    name="closeCircle"
                                                    size={20}
                                                    color="gray"
                                                />
                                            </div>
                                            <div
                                                id="checkNewPhoneDiv"
                                                className={styles.checkDiv}
                                            >
                                                {phoneDivMessage}
                                            </div>
                                        </div>
                                        <button
                                            className={`${styles.violetBtn} ${styles.w100}`}
                                            onClick={editPhoneAuthBtnToggle}
                                            style={{
                                                display: phoneAuthToggle
                                                    ? "none"
                                                    : "inline-block",
                                            }}
                                        >
                                            인증번호요청
                                        </button>
                                        {phoneAuthToggle && (
                                            <div
                                                className={`${styles.enterBox}`}
                                            >
                                                {/* 인증번호 요청 버튼을 누르면 이건 보이게 */}
                                                <input
                                                    type="text"
                                                    name=""
                                                    id=""
                                                />
                                                <div
                                                    className={styles.iconWrap}
                                                >
                                                    남은시간:3:00
                                                </div>
                                                <button
                                                    className={`${styles.violetBtn} ${styles.w100}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setData({
                                                            ...data,
                                                            phone: newPhoneNum,
                                                        });
                                                        isPhoneToggle(
                                                            !phoneToggle
                                                        );
                                                        setNewPhoneNum("");
                                                    }}
                                                >
                                                    인증
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </dd>
                    </dl>
                    <dl>
                        <dt>이메일</dt>
                        <dd>
                            <span>{data.email}</span>
                            <a
                                href="#"
                                className={styles.whiteBtn}
                                onClick={editEmailBtnToggle}
                            >
                                수정
                            </a>

                            {emailToggle && (
                                <div className={styles.modifyEnter}>
                                    <p>이메일 변경을 위해 인증이 필요합니다.</p>
                                    <div>
                                        <div className={styles.enterBox}>
                                            <input
                                                type="text"
                                                id="newEmail"
                                                name="email"
                                                value={newEmail}
                                                placeholder="변경 이메일"
                                                onChange={handleChange}
                                            />
                                            <div className={styles.iconWrap}>
                                                <Icon
                                                    name="closeCircle"
                                                    size={20}
                                                    color="gray"
                                                />
                                            </div>
                                            <select name="" id="">
                                                <option value="">
                                                    직접입력
                                                </option>
                                                <option value="">
                                                    naver.com
                                                </option>
                                                <option value="">
                                                    gmail.com
                                                </option>
                                            </select>
                                            <div
                                                id="checkNewEmailDiv"
                                                className={styles.checkDiv}
                                            >
                                                {emailDivMessage}
                                            </div>
                                            <button
                                                className={`${styles.violetBtn} ${styles.w100}`}
                                                onClick={editEmailAuthBtnToggle}
                                                style={{
                                                    display: emailAuthToggle
                                                        ? "none"
                                                        : "inline-block",
                                                }}
                                            >
                                                인증번호요청
                                            </button>
                                        </div>
                                        {emailAuthToggle && (
                                            <div className={styles.enterBox}>
                                                <input
                                                    type="text"
                                                    name=""
                                                    id="emailVerifyCode"
                                                    value={emailVerifyCode}
                                                    onChange={(e) =>
                                                        setEmailVerifyCode(
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={checkVerifyNumber}
                                                />
                                                <div
                                                    className={styles.iconWrap}
                                                >
                                                    {formatTime(timer)}
                                                </div>
                                                <div
                                                    id="checkEmailDivVerify"
                                                    className={styles.checkDiv}
                                                >
                                                    {emailDivVerifyMessage}
                                                </div>
                                                <button
                                                    className={`${styles.violetBtn} ${styles.w100}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setData({
                                                            ...data,
                                                            email: newEmail,
                                                        });
                                                        isEmailToggle(
                                                            !emailToggle
                                                        );
                                                        setNewEmail("");
                                                    }}
                                                >
                                                    인증
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </dd>
                    </dl>
                    <dl>
                        <dt>가입일</dt>
                        <dd>{data.registerDate}</dd>
                    </dl>
                    <dl>
                        <dt>성별</dt>
                        <dd>
                            <input type="radio" name="M" id="man" />
                            <label htmlFor="man">남</label>

                            <input type="radio" name="F" id="woman" />
                            <label htmlFor="woman">여</label>
                        </dd>
                    </dl>
                </div>

                <div className={styles.notice}>
                    <h5>정보 수신 동의</h5>
                    <ul>
                        <li>
                            <input
                                type="checkbox"
                                name=""
                                id="allCheck"
                                checked={allCheck}
                                onChange={handleAllCheck}
                            />
                            <label htmlFor="">이벤트, 쇼핑혜택 수신동의</label>
                        </li>
                        <ul>
                            <li>
                                <input
                                    type="checkbox"
                                    name=""
                                    id="smsCheck"
                                    className="check"
                                    checked={itemCheck.smsCheck}
                                    onChange={handleItemCheck}
                                />
                                <label htmlFor="">SMS 수신</label>
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name=""
                                    id="emailCheck"
                                    className="check"
                                    checked={itemCheck.emailCheck}
                                    onChange={handleItemCheck}
                                />
                                <label htmlFor="">이메일 수신</label>
                            </li>
                            <li>
                                <p>
                                    회원정보, 구매정보 및 서비스 주요 정책 관련
                                    내용은 수신동의 여부와 관계없이 발송됩니다.
                                </p>
                            </li>
                        </ul>
                    </ul>
                </div>

                <div className={styles.btnWrap}>
                    <button className={styles.whiteBtn}>취소</button>
                    <button
                        className={styles.violetBtn}
                        onClick={() => modifyUserInfo(data)}
                    >
                        확인
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InfoModify;
