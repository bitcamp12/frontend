import React from 'react';

import styles from "../../assets/css/mypage/InfoReservation.module.css"
const InfoReservation = () => {
    return (
        <div className={styles.infoReservation}>
        <h3>예매내역 확인 · 취소</h3>
        <p className={styles.memo}>
          * 모든 내역을 합쳐 <span>0건</span>의 예매내역이 있습니다.
        </p>
        <div className={styles.searchSection}>
            <div className={styles.searchSectionTime}>
                <label>조회기간 선택:</label>
                <button>15일</button>
                <button>1개월</button>
                <button>3개월</button>
            </div>
            <div className={styles.searchSectionDate}>
            <select>
                <option>주문일자별</option>
                <option>예매날짜</option>
            </select>
            <select>
                <option>년</option>
                <option>2024</option>
            </select>
            <select>
                <option>월</option>
                <option>11</option>
            </select>
            <button>검색</button>
            </div>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <span>예매날짜</span>
            <span>예약번호</span>
            <span>상품명</span>
            <span>이용일/매수</span>
            <span>취소가능일</span>
            <span>현재상태</span>
          </div>
          <div className={styles.listItem}>
            <span className={styles.fullRow}>
              설정된 기간에 맞는 예매 내역이 없습니다.
            </span>
          </div>
        </div>
        <div className={styles.pagination}>페이징</div>
        <p className={styles.note}>
          <span>
            ※ [상세보기]에서 예매 상세내역 확인 및 예매 취소를 하실 수 있습니다.
          </span>
          <br />
          <span>
            티켓이 배송된 이후에는 인터넷 취소가 안되며, 배송받으신 티켓의 취소는
            이용일까지 인터파크로 접수된 이후에 취소가능합니다.
          </span>
        </p>
        <div className={styles.btnWrap}>
          <button className={styles.violetBtn}>패키지/시즌권 부분환불 신청</button>
        </div>
      </div>
    );
  };
  
  export default InfoReservation;