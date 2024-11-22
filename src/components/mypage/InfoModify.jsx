import React, { useEffect, useState } from "react";
import Icon from "./Icon";

import styles from "../../assets/css/mypage/InfoModify.module.css";
import axios from "axios";

const InfoModify = () => {
    // --수정 버튼을 누르면 보였다 안보였다--------------
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
    const [emailAuthToggle, isEmailAuthToggle] = useState(false);
    const editEmailAuthBtnToggle = (e) => {
        e.preventDefault();
        isEmailAuthToggle(!emailAuthToggle);
        console.log(emailAuthToggle);

        //
    };
    // --------------
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
    const [data, setDate] = useState(null);

    useEffect(() => {
        // 세션에서 id를 가져옵니다.
        const userId = "15"; //sessionStorage.getItem("id");

        axios
            .get(`http://localhost:8080/api/members/getUserInfo/${userId}`)
            .then((response) => {
                console.log(response);
                setDate(response.data);
            })
            .catch((error) => console.error("ERROR(사용자정보수정): ", error));
    }, []);

    if (!data) {
        // data(id)가 없다면 메인페이지 또는 회원가입페이지로 이동 시키고 싶은데..
        return <div>No data available</div>;
    }

    return (
        <div className={styles.member_info_modify}>
            <h3>회원정보수정</h3>

            <form id="checkPwdForm" className={styles.checkPwdForm}>
                <div className={"styles.member_info_lock"}>
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
                        <dt>휴대폰번호</dt>
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
                                                name=""
                                                id=""
                                                placeholder="변경 휴대폰번호입력 (-없이)"
                                            />
                                            <div className={styles.iconWrap}>
                                                <Icon
                                                    name="closeCircle"
                                                    size={20}
                                                    color="gray"
                                                />
                                            </div>
                                            <div className={styles.checkDiv}>
                                                잘못된 휴대폰 형식입니다.
                                            </div>
                                        </div>
                                        <button
                                            className={`${styles.violetBtn} ${styles.w100}`}
                                            onClick={editPhoneAuthBtnToggle}
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
                                                name="newEmail"
                                                id="newEmail"
                                                placeholder="변경 이메일"
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
                                            <div className={styles.checkDiv}>
                                                이메일을 입력해주세요
                                            </div>
                                            <button
                                                className={`${styles.violetBtn} ${styles.w100}`}
                                                onClick={editEmailAuthBtnToggle}
                                            >
                                                인증번호요청
                                            </button>
                                        </div>
                                        {emailAuthToggle && (
                                            <div className={styles.enterBox}>
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
                            <input type="radio" name="gender" id="man" />
                            <label htmlFor="man">남</label>

                            <input type="radio" name="gender" id="woman" />
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
                    <button className={styles.violetBtn}>확인</button>
                </div>
            </form>
        </div>
    );
};

export default InfoModify;
