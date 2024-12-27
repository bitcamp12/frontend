import React, { useEffect, useState } from "react";

import styles from "../../assets/css/mypage/InfoReservation.module.css";
import axios from "axios";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

const InfoReservation = () => {
    //select 날짜
    const date = new Date();
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth() + 1);

    const formattedDate = format(date, "yyyy-MM-dd");

    const years = [];
    for (let index = year - 5; index < year + 5; index++) {
        years.push(index);
    }
    const months = [];
    for (let index = 1; index <= 12; index++) {
        months.push(index);
    }

    // 월별 검색 기능 -> 검색버튼을 눌렀을 때 작동하도록
    const [classifyValue, setClassifyValue] = useState("");
    const [yearValue, setYearValue] = useState("");
    const [monthValue, setMonthValue] = useState("");

    const classifyValueChange = (e) => {
        setClassifyValue(e.target.value);
    };
    const yearValueChange = (e) => {
        setYearValue(e.target.value);
    };
    const monthValueChange = (e) => {
        setMonthValue(e.target.value);
    };

    const searchByMonthly = () => {
        if (classifyValue === "" || yearValue === "" || monthValue === "") {
            return;
        }
        setCurrentPage(0); // 검색시 첫 페이지
        fetchItems();
    };

    // 예약정보 불러오기 - 페이징징징징
    const [myBooks, setMyBooks] = useState([]); // 글 목록을 담을 리스트

    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
    const [totalPage, setTotalPage] = useState(0); // 전페 페이지

    const accessToken = localStorage.getItem("token"); // 로컬스토리지
    const fetchItems = async () => {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/members/checkMyBook/pagination`,
            {
                params: {
                    classify: classifyValue,
                    year: yearValue,
                    month: monthValue,
                    currentPage: currentPage,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        if (res.status === 200) {
            // 응답에서 새로운 토큰이 있으면 로컬스토리지에 저장
            const authorizationHeader =
                res.headers["Authorization"] || res.headers["authorization"];
            if (authorizationHeader) {
                const newToken = authorizationHeader.replace("Bearer ", ""); // "Bearer " 제거
                localStorage.setItem("token", newToken); // 새로운 토큰 저장
            }
        }
        setMyBooks(res.data.content);
        setTotalPage(res.data.totalPages);
    };

    useEffect(() => {
        // 페이지 로드시
        fetchItems();
    }, [currentPage, classifyValue, yearValue, monthValue]);

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    };

    return (
        <div className={styles.infoReservation}>
            <h3>예매내역 확인 · 취소</h3>
            <p className={styles.memo}>
                * 모든 내역을 합쳐 <span>{"0건"}</span>의 예매내역이 있습니다.
            </p>
            <div className={styles.searchSection}>
                <div className={styles.searchSectionDate}>
                    <select
                        id="classify"
                        className="classify"
                        value={classifyValue}
                        onChange={classifyValueChange}
                    >
                        <option value="">구분</option>
                        <option value="pay_date">예매날짜</option>
                    </select>
                    <select
                        id="year"
                        className="year"
                        value={yearValue}
                        onChange={yearValueChange}
                    >
                        <option value="">년</option>
                        {years.map((index) => (
                            <option key={index} value={index}>
                                {index}
                            </option>
                        ))}
                    </select>
                    <select
                        id="month"
                        className="month"
                        value={monthValue}
                        onChange={monthValueChange}
                    >
                        <option value="">월</option>
                        {months.map((index) => (
                            <option key={index} value={index}>
                                {index}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.listContainer}>
                <div className={styles.listHeader}>
                    <span>예매번호</span>
                    <span>상품명</span>
                    <span>공연일/매수</span>
                    <span>결제 금액</span>
                    <span>결제 상태</span>
                    <span>취소여부</span>
                </div>
                {/* // 예약목록(myBooks)이 없다면, */}
                {!myBooks && myBooks.length <= 0 ? (
                    <div className={styles.listItem}>
                        <span className={styles.fullRow}>
                            설정된 기간에 맞는 예매 내역이 없습니다.
                        </span>
                    </div>
                ) : (
                    // {/* // 예약 목록(myBook)이 있다면 */}
                    myBooks.map((item) => (
                        <div key={item.bookSeq} className={styles.listItem}>
                            <span>{item.bookSeq}</span>
                            <span>{item.playTimeTable.play.name}</span>
                            <span>
                                {format(
                                    item.playTimeTable.targetDate,
                                    "yyyy-MM-dd"
                                )}
                            </span>
                            <span>{item.totalPrice}원</span>
                            <span>{item.paymentStatus}</span>
                            <span>
                                {/* 이거 안되는중 ......  */}
                                {item.playTimeTable.targetDate < formattedDate
                                    ? "취소가능"
                                    : "취소불가능"}
                            </span>
                        </div>
                    ))
                )}
            </div>
            <div className={styles.pagination}>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageRangeDisplayed={3}
                    pageCount={myBooks.length === 0 ? 1 : totalPage}
                    onPageChange={handlePageClick}
                    previousClassName={styles.pageItem}
                    nextClassName={styles.pageItem}
                    breakClassName={styles.break}
                    containerClassName={styles.pagePagination}
                    pageClassName={styles.pageItem}
                    activeClassName={styles.active}
                    disabledClassName="disabled"
                ></ReactPaginate>
            </div>

            <p className={styles.note}>
                <span>
                    ※ [상세보기]에서 예매 상세내역 확인 및 예매 취소를 하실 수
                    있습니다.
                </span>
                <br />
                <span>
                    티켓이 배송된 이후에는 인터넷 취소가 안되며, 배송받으신
                    티켓의 취소는 이용일까지 인터파크로 접수된 이후에
                    취소가능합니다.
                </span>
            </p>
            <div className={styles.btnWrap}>
                <button className={styles.violetBtn}>
                    패키지/시즌권 부분환불 신청
                </button>
            </div>
        </div>
    );
};

export default InfoReservation;
