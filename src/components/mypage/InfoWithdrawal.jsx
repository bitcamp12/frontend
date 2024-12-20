import React, { useEffect, useState } from "react";

import styles from "../../assets/css/mypage/InfoWithdrawal.module.css";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router";

const InfoWithdrawal = (props) => {
    const navigator = useNavigate();

    // 모달
    const [alertVisible, setAlertVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("떠리티켓 회원 탈퇴");
    const [modalMessage, setModalMessage] = useState("");
    const closeModal = () => {
        setAlertVisible(false);
        // navigator("/");
    };

    // 체크박스 선택되었는지 상태저장
    const [checkDrawal, setCheckDrawal] = useState(false);
    const accessToken = localStorage.getItem("token"); // 로컬스토리지
    const formSubmit = (e) => {
        e.preventDefault();
        console.log(checkDrawal);

        if (checkDrawal) {
            // 체크박스가 선택되어 있으면 탈퇴가능
            alert("탈퇴!!! ");
            axios
                .delete(
                    `${process.env.REACT_APP_API_URL}/members/infoWithdrawal/me/`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        withCredentials: true, // 세션 쿠키를 포함
                    }
                ) // 세션으로 넘어온 id가 될 예정
                .then((response) => {
                    console.log(response.data);
                    setModalMessage(response.data.message);
                    setAlertVisible(true);
                    if (response.data.status === 200) {
                        // 응답에서 새로운 토큰이 있으면 로컬스토리지에 저장
                        const authorizationHeader =
                            response.data.status.headers["Authorization"] ||
                            response.data.status.headers["authorization"];
                        if (authorizationHeader) {
                            const newToken = authorizationHeader.replace(
                                "Bearer ",
                                ""
                            ); // "Bearer " 제거
                            localStorage.setItem("token", newToken); // 새로운 토큰 저장
                        }
                    }
                })
                .catch((error) => console.log(error));
        } else {
            alert("탈퇴못함 ㅋ ");
            // 체크박스가 선택되지 않았다면, 탈퇴불가능 (안내창?띄울까?)
        }
    };

    return (
        <div className={styles.infoWithdrawal}>
            <h3>회원탈퇴</h3>
            <div className={styles.infoWithdrawalContent}>
                <h5>탈퇴시 주의사항</h5>
                <div>
                    <ul>
                        <li>
                            <p>적립금/혜택 소멸 및 재가입시 복구 불가</p>
                            <span>
                                회원 탈퇴 시, 회원님 아이디에 등록된 적립금과
                                우수고객등급에 따른 혜택은 모두 소멸되어,
                                재가입하더라도 복구되지 않습니다. (I-Point,
                                영화/공연/문화 예매권, 할인쿠폰 등)
                            </span>
                        </li>
                        <li>
                            <p>유료회원 서비스 TOPING 이용 및 복구 불가</p>
                            <span>
                                회원 탈퇴 시, 유료회원 서비스인 TOPING 서비스
                                이용이 불가하며, 재가입하더라도 복구되지
                                않습니다.
                                <br />
                                따라서 30 티켓 회원 탈퇴 이전에 반드시 TOPING
                                회원 탈퇴를 먼저 진행하시기 바랍니다.
                                <br />
                                (TOPING 탈퇴 시 가입일 포함 7일 이내 TOPING
                                서비스 이용 d내역이 없을 경우 전액 환불되며,
                                가입일 7일이 초과한 경우 TOPING 위약금이
                                발생됩니다. 또한 위약금 여부와 관계없이 이용
                                컨텐츠당 이용금액 별도 공제 후 환불됩니다.)
                            </span>
                        </li>
                        <li>
                            <p>
                                관계법령에 따른 주문번호는 회원 탈퇴 후 5년간
                                보존
                            </p>
                            <span>
                                전자상거래 등에서의 소비자 보호에 관한 법률
                                제6조(거래기록의 보존 등)에 의거, 주문정보는
                                회원 탈퇴 후 5년간 보존됩니다.
                            </span>
                        </li>
                        <li>
                            <span>
                                티켓 예매 후 탈퇴 시에 공연 관람은 가능하나
                                예매번호, 예매내역을 볼 수 없으며, 예매취소 및
                                배송지 변경은 예매번호를 가지고 고객센터를
                                통해서만 진행가능합니다.
                            </span>
                        </li>
                        <li>
                            <p>탈퇴 처리 및 재가입 제한 정책 안내</p>
                            <span>
                                회원 탈퇴 시, 즉시 탈퇴 처리되며 탈퇴 후 7일간
                                휴대전화번호/이메일주소/개인식별정보(CI/DI)가
                                보관됩니다.
                                <br />
                                <strong>
                                    탈퇴 후, 7일간 신규 계정에 동일한 명의로
                                    본인인증 진행이 불가합니다. 본인인증이
                                    진행되지 않는 경우 30 티켓 티켓의 모든 예매
                                    서비스를 이용하실 수 없습니다.
                                </strong>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="">
                <h5>게시글 주의사항</h5>
                <div>
                    <ul>
                        <li>
                            <span>
                                상품리뷰와 1:1 문의와 같은 게시판형 서비스에
                                등록된 게시물은 탈퇴 후에도 자동 삭제 되지
                                않습니다. 탈퇴 후에는 회원정보 삭제로 인해
                                작성자 본인 여부를 확인할 수 없으므로, 게시글
                                편집 및 삭제 처리가 원천적으로 불가능합니다.
                                삭제를 원하는 게시글이 있을 경우, 먼저 해당
                                게시글을 삭제 하신 후, 탈퇴를 신청하시기
                                바랍니다
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <hr />
            {/*  */}
            <form id="InfoWithdrawalForm" onSubmit={formSubmit}>
                <div className={styles.notice}>
                    <div className={styles.noticeCheckbox}>
                        <input
                            type="checkbox"
                            name=""
                            id="checkDrawal"
                            checked={checkDrawal}
                            onChange={(e) => setCheckDrawal(e.target.checked)}
                        />
                        <label htmlFor="checkDrawal">
                            상기 사항을 모두 확인하였습니다.
                        </label>
                    </div>
                    <div className={styles.noticeContent}>
                        회원 탈퇴 시, TOPING 서비스(쿠폰, I-Point 포함) 의
                        이용은 종료되고 적립금 및 지급된 혜택은 소멸되어
                        재가입에 따른 복구가 불가하며{" "}
                        <b>
                            5년간 기존 아이디의 재사용 불가 및{" "}
                            <span>7일이내 동일명의의 본인인증 불가</span> 에
                            대한 사항에 동의 합니다
                        </b>
                    </div>
                </div>

                <div className={styles.btnWrap}>
                    <button type="reset" className={styles.whiteBtn}>
                        취소
                    </button>
                    <button type="submit" className={styles.violetBtn}>
                        동의
                    </button>
                </div>
            </form>

            <Modal
                closeModal={closeModal}
                modalMessage={modalMessage}
                modalTitle={modalTitle}
                alertVisible={alertVisible}
            />
        </div>
    );
};

export default InfoWithdrawal;
