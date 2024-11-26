import React from 'react';

import styles from "../../assets/css/mypage/InfoBookmark.module.css"
const InfoBookmark = () => {
    return (
        <div className={styles.infoBookmark}>
            <h3>즐겨찾기</h3>

            <div className={styles.listContainer}>
                {/* If there are no bookmarked items */}
                <div className={styles.noItems}>
                    <span>관심있는 연극이 없습니다.</span>
                </div>

                {/* If there are bookmarked items */}
                <div className={styles.bookmarkedItem}>
                    <div className={styles.checkboxContainer}>
                        <input type="checkbox" name="" id="" />
                    </div>
                    <div className={styles.itemDetails}>
                        <span className={styles.itemName}>연극</span>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.actionButton}>버튼1</button>
                        <button className={styles.actionButton}>버튼2</button>
                        <button className={styles.actionButton}>버튼3</button>
                    </div>
                </div>
            </div>

            <div className={styles.pagination}>
                페이징 처리
            </div>
        </div>
    );
};

export default InfoBookmark;