import React from "react";
import Icon from "./Icon";

import styles from "../../assets/css/mypage/InfoModify.module.css";

const InfoModify = () => {
    return (
        <div className={styles.member_info_modify}>
            <h3>회원정보수정</h3>

            <form id="checkPwdForm" className={styles.checkPwdForm}>
                <div className={"styles.member_info_lock"}>
                    <h5>기본정보</h5>
                    <dl>
                        <dt>아이디</dt>
                        <dd>hong123</dd>
                    </dl>
                    <dl>
                        <dt>이름</dt>
                        <dd>
                            <span>홍길동</span>
                            <a className={styles.whiteBtn}>수정</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>휴대폰번호</dt>
                        <dd>
                            <span>010-0000-0000</span>
                            <a className={styles.whiteBtn}>수정</a>

                            <div className={styles.modifyEnter}>
                                <p>휴대폰번호 변경을 위해 인증이 필요합니다.</p>
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
                                    <div className={`${styles.enterBox}`}>
                                        {/* 인증번호 요청 버튼을 누르면 이건 보이게 */}
                                        <input type="text" name="" id="" />
                                        <div className={styles.iconWrap}>
                                            남은시간:3:00
                                        </div>
                                        <button
                                            className={`${styles.violetBtn} ${styles.w100}`}
                                        >
                                            인증
                                        </button>
                                    </div>
                                    <button
                                        className={`${styles.violetBtn} ${styles.w100}`}
                                    >
                                        {/* 인증번호 요청 버튼을 누르면 dispaly:none속성을 축하는 클래스 추가 */}
                                        인증번호요청
                                    </button>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>이메일</dt>
                        <dd>
                            <span>hong@naver.com</span>
                            <a className={styles.whiteBtn}>수정</a>

                            <div className={styles.modifyEnter}>
                                <p>이메일 변경을 위해 인증이 필요합니다.</p>
                                <div>
                                    <div className={styles.enterBox}>
                                        <input
                                            type="text"
                                            name=""
                                            id=""
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
                                            <option value="">직접입력</option>
                                            <option value="">naver.com</option>
                                            <option value="">gmail.com</option>
                                        </select>
                                        <div className={styles.checkDiv}>
                                            이메일을 입력해주세요
                                        </div>
                                    </div>
                                    <div className={styles.enterBox}>
                                        <input type="text" name="" id="" />
                                        <div className={styles.iconWrap}>
                                            남은시간:3:00
                                        </div>
                                        <button
                                            className={`${styles.violetBtn} ${styles.w100}`}
                                        >
                                            인증
                                        </button>
                                    </div>
                                    <button
                                        className={`${styles.violetBtn} ${styles.w100}`}
                                    >
                                        {/* 인증번호 요청 버튼을 누르면 dispaly:none속성을 축하는 클래스 추가 */}
                                        인증번호요청
                                    </button>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>생년월일</dt>
                        <dd>2024-11-20</dd>
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
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">이벤트, 쇼핑혜택 수신동의</label>
                        </li>
                        <ul>
                            <li>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">SMS 수신</label>
                            </li>
                            <li>
                                <input type="checkbox" name="" id="" />
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
