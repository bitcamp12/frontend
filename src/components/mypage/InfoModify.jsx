import React, { useEffect, useState } from "react";
import Icon from "./Icon";

import styles from "../../assets/css/mypage/InfoModify.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

const InfoModify = ({ password, setPassword, handlePasswordChange }) => {
    const navigate = useNavigate();

    const [newPhoneNum, setNewPhoneNum] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [resDate, setResDate] = useState("");
    const validatePhoneNumber = (value) => {
        const phoneRegex = /^01[0-9]\d{3,4}\d{4}$/; // 정규식 : /로 감싼 문자. 또는 new RegExp("")
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
                    setPhoneDivMessage("인증 번호를 요청해주세요.");
                } else {
                    setPhoneDivMessage("입력 형식('-' 제외 필수)이 다릅니다.");
                }
                break;
            case "newEmail":
                setNewEmail(value);
                if (validateEmail(value)) {
                    setEmailDivMessage("인증 번호를 요청해주세요.");
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
        const userId = sessionStorage.getItem("id");
        // console.log(userId);

        axios
            .get(`${process.env.REACT_APP_API_URL}/members/getUserInfo/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true, // 세션 쿠키를 포함
            })
            .then((response) => {
                console.log(response.data);
                setData(response.data.data);
                const registerDate = new Date(response.data.data.registerDate);

                // 년, 월, 일 형식으로 변환 (예: 2024-12-26)
                const formattedDate = `${registerDate.getFullYear()}-${(
                    registerDate.getMonth() + 1
                )
                    .toString()
                    .padStart(2, "0")}-${registerDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`;

                setResDate(formattedDate);
            })
            .catch((error) => console.error("ERROR(사용자정보수정): ", error));
    }, []);

    // ------------
    // --수정 버튼을 누르면 보였다 안보였다------------
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

    const [timerp, setTimerp] = useState(0); // 타이머 초를 0으로 초기화
    const [isTimerpActive, setIsTimerpActive] = useState(false); // true이면 타이머 작동
    useEffect(() => {
        let interval;
        if (isTimerpActive && timerp > 0) {
            interval = setInterval(() => {
                setTimerp((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timerp === 0) {
            setIsTimerpActive(false); // Stop the timer once it reaches 0
        }
        return () => clearInterval(interval); // Cleanup on component unmount or timer stop
    }, [isTimerpActive, timerp]);

    // 시간을 mm:ss 형식으로 변환하는 함수
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}`;
    };
    // -- 비밀번호 수정 --
    const [newPassword, setNewPassword] = useState("");
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const [reNewPassword, setReNewPassword] = useState("");
    const handleReNewPasswordChange = (event) => {
        setReNewPassword(event.target.value);
    };

    const [currentPassword, setCurrentPassword] = useState("");
    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };
    const isPasswordCorrect = currentPassword === password;

    const [passwordToggle, isPasswordToggle] = useState(false);
    const editPasswordBtnToggle = () => {
        if (passwordToggle) {
            setCurrentPassword("");
            setNewPassword("");
            setReNewPassword("");
        }
        isPasswordToggle(!passwordToggle);
    };

    const [passwordMessage, setPasswordMessage] = useState("");
    const checkPasswordMatch = (newPassword, reNewPassword) => {
        newPassword !== reNewPassword
            ? setPasswordMessage("새로운 비밀번호가 일치하지 않습니다")
            : setPasswordMessage("새로운 비밀번호가 일치합니다");
    };
    const handleNewPasswordMatchBlur = () => {
        checkPasswordMatch(newPassword, reNewPassword);
    };
    // --핸드폰번호수정--
    const [phoneToggle, isPhoneToggle] = useState(false); // false이면 안보이게 하고 싶어요
    const editPhoneBtnToggle = (e) => {
        e.preventDefault();

        isPhoneToggle(!phoneToggle);
    };
    const [phoneAuthToggle, isPhoneAuthToggle] = useState(false);
    const editPhoneAuthBtnToggle = (e) => {
        e.preventDefault();
        if (!validatePhoneNumber(newPhoneNum)) {
            alert("유효하지 않은 전화번호 형식입니다.");
            return;
        }
        setIsTimerpActive(true);
        setTimerp(180);
        setPhoneDivMessage("인증 번호를 입력해주세요.");
        isPhoneAuthToggle(!phoneAuthToggle);
        console.log(phoneAuthToggle);
        axios
            .post(`${process.env.REACT_APP_API_URL}/members/sendPhoneNumber`, {
                phoneNum: newPhoneNum,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => console.log(error));
    };
    const [phoneVerifyCode, setPhoneVerifyCode] = useState("");
    const checkVerifyPhoneNumber = () => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/members/verifyPhone`, {
                phoneNum: newPhoneNum,
                code: phoneVerifyCode,
            })
            .then((response) => {
                console.log(response.data.message);
                if (response.data.message === "match") {
                    alert("인증번호 일치합니다.");
                    //타이머중지
                    setIsTimerActive(false);
                    setData({
                        ...data,
                        phone: newPhoneNum,
                    });
                    isPhoneToggle(!phoneToggle);
                    setPhoneDivMessage("");
                    setNewPhoneNum("");
                    isPhoneAuthToggle(!phoneAuthToggle);
                    setPhoneVerifyCode("");
                    setTimer(0);
                } else if (response.data.status == 400) {
                    alert("인증번호 일치하지 않습니다.");
                } else {
                    alert("인증번호 일치하지 않습니다.");
                }
            })
            .catch((error) => {
                alert("인증번호 일치하지 않습니다.");
            });
    };

    // --이메일 수정--
    const [emailToggle, isEmailToggle] = useState(false);
    const editEmailBtnToggle = (e) => {
        e.preventDefault();
        isEmailToggle(!emailToggle);
    };
    const [emailAuthToggle, isEmailAuthToggle] = useState(false); // 인증번호 전송
    const editEmailAuthBtnToggle = (e) => {
        e.preventDefault();
        if (!validateEmail(newEmail)) {
            alert("유효하지 않은 이메일 형식입니다.");
            return;
        }
        isEmailAuthToggle(!emailAuthToggle);
        console.log(emailAuthToggle);
    };

    useEffect(() => {
        if (emailAuthToggle === true) {
            setTimer(180);
            setIsTimerActive(true);
            axios
                .post(`${process.env.REACT_APP_API_URL}/members/sendNumber`, {
                    email: newEmail,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => console.log(error));
        }
    }, [emailAuthToggle]);

    const [emailVerifyCode, setEmailVerifyCode] = useState("");
    const [emailDivVerifyMessage, setEmailDivVerifyMessage] = useState("");
    const checkVerifyNumber = () => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/members/verifyCode`, {
                email: newEmail,
                code: emailVerifyCode,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.message === "match") {
                    alert("인증번호 일치합니다.");
                    //타이머중지
                    setIsTimerActive(false);
                    setData({
                        ...data,
                        email: newEmail,
                    });
                    isEmailToggle(!emailToggle);
                    setEmailDivMessage("");
                    setNewEmail("");
                    isEmailAuthToggle(!emailAuthToggle);
                    setEmailVerifyCode("");
                    setTimer(0);
                } else if (response.data.status == 400) {
                    alert("인증번호 일치하지 않습니다.");
                } else {
                    alert("인증번호 일치하지 않습니다.");
                }
            })
            .catch((error) => {
                alert("인증번호 일치하지 않습니다.");
            });
    };

    const modifyUserInfo = async (data, e) => {
        e.preventDefault();
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
                `${process.env.REACT_APP_API_URL}/members/modifyUserInfo`,
                modifiedData,
                {
                    headers: {
                        "Content-Type": "application/json", // 요청의 내용이 JSON임을 서버에 알려줍니다.
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                alert("회원 정보가 수정되었습니다.");
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
                        <dt>이름</dt>
                        <dd>
                            <span>{data.name}</span>
                        </dd>
                    </dl>
                    <dl>
                        <dt>아이디</dt>
                        <dd>{data.id}</dd>
                    </dl>
                    <dl>
                        <dt>비밀번호</dt>
                        <dd>
                            <input
                                type="password"
                                name="pwd"
                                id="pwd"
                                value={currentPassword}
                                placeholder="현재 비밀번호 입력"
                                onChange={handleCurrentPasswordChange}
                            />
                            <a
                                href="#"
                                className={styles.whiteBtn}
                                onClick={editPasswordBtnToggle}
                                // onclick 하면 비밀번호가 맞아? 맞으면 수정가능한 div 토글로 보여주기 : 아니면 토글 작동 X 입력한 비밀번호 지우기
                                style={{
                                    pointerEvents: isPasswordCorrect
                                        ? "auto"
                                        : "none",
                                    opacity: isPasswordCorrect ? 1 : 0.5,
                                }}
                            >
                                수정
                            </a>
                            {passwordToggle && (
                                <div
                                    id="editPasswordDiv"
                                    className={styles.modifyEnter}
                                >
                                    <div className={styles.enterBox}>
                                        <input
                                            type="text"
                                            name="newPassword"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={handleNewPasswordChange}
                                            placeholder="새로운 비밀번호 입력"
                                        />
                                        <input
                                            type="text"
                                            name="reNewPassword"
                                            id="reNewPassword"
                                            value={reNewPassword}
                                            onChange={handleReNewPasswordChange}
                                            onBlur={handleNewPasswordMatchBlur}
                                            placeholder="새로운 비밀번호 한번 더 입력"
                                        />
                                    </div>
                                    <div
                                        id="checkNewPasswordDiv"
                                        className={styles.checkDiv}
                                    >
                                        {passwordMessage}
                                    </div>
                                    <button
                                        className={`${styles.violetBtn} ${styles.w100}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNewPasswordMatchBlur();
                                            if (
                                                newPassword == "" ||
                                                reNewPassword == "" ||
                                                newPassword !== reNewPassword
                                            ) {
                                                alert(
                                                    "비밀 번호가 일치하지 않습니다."
                                                );
                                                return;
                                            }

                                            alert("비밀 번호를 수정합니다.");
                                            setData({
                                                ...data,
                                                password: newPassword,
                                            });
                                            isPasswordToggle(!passwordToggle);
                                            setReNewPassword("");
                                            setNewPassword("");
                                            setCurrentPassword(newPassword);
                                            setPasswordMessage("");
                                        }}
                                    >
                                        변경
                                    </button>
                                </div>
                            )}
                        </dd>
                    </dl>
                    <dl>
                        <dt className="editPhone">휴대폰번호</dt>
                        <dd>
                            <span>
                                {data.phone == "01012345678" ? "비공개" : data.phone}
                            </span>
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
                                                placeholder="변경 휴대폰번호 (01012341234)"
                                                onChange={handleChange}
                                            />
                                            <div
                                                className={styles.iconWrap}
                                                onClick={() =>
                                                    setNewPhoneNum("")
                                                }
                                            >
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
                                            인증 번호 요청
                                        </button>
                                        {phoneAuthToggle && (
                                            <div
                                                className={`${styles.enterBox}`}
                                            >
                                                {/* 인증번호 요청 버튼을 누르면 이건 보이게 */}
                                                <input
                                                    type="text"
                                                    name="phoneVerifyCode"
                                                    id="phoneVerifyCode"
                                                    value={phoneVerifyCode}
                                                    onChange={(e) => {
                                                        setPhoneVerifyCode(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <div
                                                    className={styles.iconWrap}
                                                >
                                                    {formatTime(timerp)}
                                                </div>
                                                <button
                                                    className={`${styles.violetBtn} ${styles.w100}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (
                                                            isTimerpActive ==
                                                            false
                                                        ) {
                                                            alert(
                                                                "인증 시간이 만료되었습니다."
                                                            );
                                                            return;
                                                        }
                                                        checkVerifyPhoneNumber();
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
                                                placeholder="변경 이메일(abc@naver.com)"
                                                onChange={handleChange}
                                            />
                                            <div
                                                className={styles.iconWrap}
                                                onClick={() => setNewEmail("")}
                                            >
                                                <Icon
                                                    name="closeCircle"
                                                    size={20}
                                                    color="gray"
                                                />
                                            </div>
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
                                                인증 번호 요청
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
                                                        if (
                                                            isTimerActive ==
                                                            false
                                                        ) {
                                                            alert(
                                                                "인증 시간이 만료되었습니다."
                                                            );
                                                            return;
                                                        }
                                                        checkVerifyNumber();
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
                        <dd>{resDate}</dd>
                    </dl>
                    <dl>
                        <dt>성별</dt>
                        <dd>
                            <input
                                type="radio"
                                name="M"
                                id="man"
                                checked={data.gender === "M"}
                                disabled
                            />
                            <label htmlFor="man">남</label>

                            <input
                                type="radio"
                                name="F"
                                id="woman"
                                checked={data.gender === "F"}
                                disabled
                            />
                            <label htmlFor="woman">여</label>
                        </dd>
                    </dl>
                </div>

                <div className={styles.btnWrap}>
                    <button
                        className={styles.violetBtn}
                        onClick={(e) => modifyUserInfo(data, e)}
                    >
                        변경 완료
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InfoModify;
