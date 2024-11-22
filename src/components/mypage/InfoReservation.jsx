import React from 'react';

import styles from "../../assets/css/mypage/InfoReservation.module.css"
const InfoReservation = () => {
    return (
        <div class={styles.infoReservation}>
            <h3>예매내역 확인 · 취소</h3>
            <p class={styles.memo}>
            * 모든 내역을 합쳐 <span>0건</span>의 예매내역이 있습니다.
            </p>
            <div class={styles.searchSection}>
                <label>조회기간 선택:</label>
                <button>15일</button>
                <button>1개월</button>
                <button>3개월</button>
                <select>
                    <option>주문일자별</option>
                    <option>예매일</option>
                </select>
                <select>
                    <option>년</option>
                </select>
                <select>
                    <option>월</option>
                </select>
                <button>검색</button>
            </div>
            <div class={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th>예매일</th>
                        <th>예약번호</th>
                        <th>상품명</th>
                        <th>이용일/매수</th>
                        <th>취소가능일</th>
                        <th>현재상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colspan="6">설정된 기간에 맞는 예매 내역이 없습니다.</td>
                    </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>

            <div>페이징</div>

            <p class={styles.note}>
            <span>※ [상세보기]에서 예매 상세내역 확인 및 예매 취소를 하실 수 있습니다.</span><br/>
            <span>티켓이 배송된 이후에는 인터넷 취소가 안되며, 배송받으신 티켓의 취소는 이용일까지 인터파크로 접수된 이후에 취소가능합니다.</span>
            </p>

            <div className={styles.btnWrap}>
                <button class={styles.violetBtn}>패키지/시즌권 부분환불 신청</button>
            </div>
      </div>
    );
};

export default InfoReservation;