import React, { useEffect, useState } from "react";

import styles from "../../assets/css/mypage/InfoBookmark.module.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import { useNavigate } from "react-router";
const InfoBookmark = () => {
    const accessToken = localStorage.getItem("token"); // 로컬스토리지
    const navigate = useNavigate();
    const [favoriteList, setFavoriteList] = useState([]); // 좋아요 담을 리스트
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPage, setTotalPage] = useState(0); // 전체 페이지
    const pageBlock = 5; // 한 블록에 보여줄 페이지 수 (5개씩)
    const startPage = Math.floor((currentPage - 1) / pageBlock) * pageBlock + 1;
    const endPage = Math.min(startPage + pageBlock - 1, totalPage - 1);

    const fetchItem = async () => {
        const res = await axios
            .get(
                `${process.env.REACT_APP_API_URL}/members/checkFavorite/pagination`,
                {
                    params: {
                        currentPage: currentPage,
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            )
            .then((response) => {
                // console.log(response.data.content);
                setFavoriteList(response.data.content);
                setTotalPage(response.data.totalPages);

                if (response.status === 200) {
                    // 응답에서 새로운 토큰이 있으면 로컬스토리지에 저장
                    const authorizationHeader =
                        response.headers["Authorization"] ||
                        response.headers["authorization"];
                    if (authorizationHeader) {
                        const newToken = authorizationHeader.replace(
                            "Bearer ",
                            ""
                        ); // "Bearer " 제거
                        localStorage.setItem("token", newToken); // 새로운 토큰 저장
                    }
                }
            });
    };

    console.log(favoriteList);

    // 삭제
    const delFavoriteItem = (favoriteSeq) => {
        axios
            .delete(
                `${process.env.REACT_APP_API_URL}/members/checkFavorite/delete`,
                {
                    params: {
                        delFavoriteSeq: favoriteSeq, // 전달받은 favoriteSeq 값 사용
                        currentPage: currentPage,
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            )
            .then(() => {
                fetchItem();
            })
            .catch((error) => {
                console.error("Error deleting favorite item:", error);
            });
    };

    // 페이지 이동
    const handlePageClick = (e) => {

        console.log('선택 : '+e.selected);
        setCurrentPage(e);
    };

    useEffect(() => {
        fetchItem();
    }, [currentPage]);
    

    return (
        <div className={styles.infoBookmark}>
            <h3>즐겨찾기</h3>

            <div className={styles.listContainer}>
                <div className={styles.listHeader}>
                    <span style={{ width: '150px', display: 'inline-block', textAlign: 'left'}}>공연명</span>
                    <span >공연 기간</span>
                </div>
                {favoriteList && favoriteList.length > 0 ? (
                    // If there are bookmarked items
                    favoriteList.map((item, index) => (
                        <div key={index} className={styles.bookmarkedItem}>
                            <div className={styles.itemDetails}>
                                <span className={styles.itemName} style={{ width: '150px', display: 'inline-block' }} >
                                    {item.play.name}
                                </span>
                                <span className={styles.itemName}>
                                    {format(item.play.endTime, "yyyy-MM-dd")} ~  {format(item.play.startTime, "yyyy-MM-dd")}
                                </span>
                            </div>
                            <div className={styles.actions}>
                            <button
                                    value={item.favoriteSeq}
                                    className={styles.actionButton}
                                    onClick={() =>
                                    {navigate('/playDetail/'+item.play.playSeq)}
                                    }
                                >
                                    바로 가기
                                </button>
                                <button
                                    value={item.favoriteSeq}
                                    className={styles.actionButton}
                                    onClick={() =>
                                        delFavoriteItem(item.favoriteSeq)
                                    }
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.listItem}>
                        <span className={styles.fullRow}>
                            관심있는 연극이 없습니다
                        </span>
                    </div>
                )}
            </div>

            {/* <div className={styles.pagination}>
                <ReactPaginate
                    previousLabel={""}
                    nextLabel={""}
                    pageRangeDisplayed={3}
                    pageCount={favoriteList.length === 0 ? 1 : totalPage}
                    onPageChange={handlePageClick}
                    previousClassName={`${styles.pageItem} ${styles.previous}`}
                    nextClassName={`${styles.pageItem} ${styles.next}`}
                    breakClassName={styles.break}
                    containerClassName={styles.pagePagination}
                    pageClassName={styles.pageItem}
                    activeClassName={styles.active}
                    disabledClassName="disabled"
                ></ReactPaginate>
            </div> */}

            <div className="pagination">
             {/* 이전 버튼 */}
             {startPage > 1 && (
                      <span className="paging" onClick={() => handlePageClick(startPage - 1)}>이전</span>
                    )}

                    {/* 페이지 번호 */}
                    {Array.from({ length: endPage - startPage + 1}, (_, index) => {
                      const pageNum = startPage + index;
                      return (
                        <span
                          key={pageNum}
                          className={`paging ${currentPage === pageNum ? 'current' : ''}`}
                          onClick={() => handlePageClick(pageNum)}
                        >
                          {pageNum}
                        </span>
                      );
                    })}

                    {/* 다음 버튼 */}
                    {endPage < totalPage - 1 && (
                      <span className="paging" onClick={() => handlePageClick(endPage + 1)}>다음</span>
                    )}
             </div>
        </div>
    );
};

export default InfoBookmark;
