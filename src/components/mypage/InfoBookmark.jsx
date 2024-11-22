import React from 'react';

import styles from "../../assets/css/mypage/InfoBookmark.module.css"
const InfoBookmark = () => {
    return (
        <div class={styles.infoBookmark}>
            <h3>관심있는 연극 목록</h3>
            
            <div class={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="" id="" />
                        </th>
                        <th>상품명</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colspan="6">관심있는 연극이 없습니다.</td>
                    </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
            <div>
                페이징
            </div>

      </div>
    );
};

export default InfoBookmark;