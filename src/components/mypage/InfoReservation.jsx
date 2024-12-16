import React, { useEffect, useState } from "react";

import styles from "../../assets/css/mypage/InfoReservation.module.css";
import axios from "axios";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

const InfoReservation = () => {
    //select 날짜
    const date = new Date(); //.getMonth()+1; //getFullYear(); // toLocaleDateString();
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth + 1);

    const formattedDate = format(date, "yyyy-MM-dd");
    console.log("formattedDate: " + formattedDate);

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
        // DOM을 직접 움직이면 안됨
        // var classify = document.getElementById("classify");
        // var classifyValue = classify.options[classify.selectedIndex].value;

        // var year = document.getElementById("year");
        // var yearValue = year.options[year.selectedIndex].value;

        // var month = document.getElementById("month");
        // var monthValue = month.options[month.selectedIndex].value;

        if (classifyValue === "" || yearValue === "" || monthValue === "") {
            return;
        }

        axios
            .get(
                "http://localhost:8080/api/members/checkMyBook/checkBookingsByDate",
                {
                    params: {
                        classify: classifyValue,
                        year: yearValue,
                        month: monthValue,
                    },
                    withCredentials: true,
                }
            )
            .then((response) => {
                console.log(response.data.data);
                setMyBooks(response.data.data);
            })
            .catch((error) => console.log(error));
    };

    // 예약정보 불러오기 - 페이징
    const [myBooks, setMyBooks] = useState([]); // 글 목록을 담을 리스트

    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
    const [totalPage, setTotalPage] = useState(0); // 전페 페이지

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(
                `http://localhost:8080/api/members/checkMyBook/pagination`,
                {
                    params: {
                        classify: classifyValue,
                        year: yearValue,
                        month: monthValue,
                        currentPage: currentPage,
                    },
                    withCredentials: true,
                }
            );
            setMyBooks(res.data.content);
            setTotalPage(res.data.totalPages);
        };
        fetchItems();
    }, [currentPage, classifyValue, yearValue, monthValue]);

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    };

    /* 처음에 불러오는거 >> 잘되는중 
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/members/checkMyBook", {
                withCredentials: true, // 세션 쿠키를 포함
            })
            .then((response) => {
                console.log(
                    "응답 전체:",
                    JSON.stringify(response.data.data, null, 2)
                );
                //setMyBooks(JSON.stringify(response.data.data, null, 2)); //JSON.stringify()를 사용하면, 실제 데이터가 배열이라 하더라도 문자열로 변환
                setMyBooks(response.data.data);
            })
            .catch((error) => console.log(error));
    }, []);
*/
    return (
        <div className={styles.infoReservation}>
            <h3>예매내역 확인 · 취소</h3>
            <p className={styles.memo}>
                * 모든 내역을 합쳐 <span>{"0건"}</span>의 예매내역이 있습니다.
            </p>
            <div className={styles.searchSection}>
                {/* 
                <div className={styles.searchSectionTime}>
                  <label>조회기간 선택:</label>
                  <button>15일</button>
                  <button>1개월</button>
                  <button>3개월</button>
              </div>
             */}
                <div className={styles.searchSectionDate}>
                    <select
                        id="classify"
                        className="classify"
                        value={classifyValue}
                        onChange={classifyValueChange}
                    >
                        <option value="" disabled hidden>
                            구분
                        </option>
                        <option value="pay_date">예매날짜</option>
                    </select>
                    <select
                        id="year"
                        className="year"
                        value={yearValue}
                        onChange={yearValueChange}
                    >
                        <option value="" disabled hidden>
                            년
                        </option>
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
                        <option value="" disabled hidden>
                            월
                        </option>
                        {months.map((index) => (
                            <option key={index} value={index}>
                                {index}
                            </option>
                        ))}
                    </select>
                    <button onClick={searchByMonthly}>검색</button>
                </div>
            </div>
            <div className={styles.listContainer}>
                <div className={styles.listHeader}>
                    <span>예매날짜</span>
                    <span>예약번호</span>
                    <span>상품명</span>
                    <span>공연일/매수</span>
                    <span>결제수단</span>
                    <span>취소여부</span>
                </div>
                {/* // 예약목록(myBooks)이 없다면, */}
                {myBooks === null ? (
                    <div className={styles.listItem}>
                        <span className={styles.fullRow}>
                            설정된 기간에 맞는 예매 내역이 없습니다.
                        </span>
                    </div>
                ) : (
                    // {/* // 예약 목록(myBook)이 있다면 */}
                    myBooks.map((item) => (
                        <div key={item.bookSeq} className={styles.listItem}>
                            <span>{format(item.payDate, "yyyy-MM-dd")}</span>
                            <span>{item.bookSeq}</span>
                            <span>{item.playTimeTable.play.name}</span>
                            <span>
                                {format(
                                    item.playTimeTable.targetDate,
                                    "yyyy-MM-dd"
                                )}
                            </span>
                            <span>{item.payment}</span>
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
                    pageCount={totalPage}
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
