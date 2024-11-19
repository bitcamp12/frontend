import React from 'react';
import "../assets/css/Footer.css";

const Footer = () => {
    return (
        <div id="footer">
            <table id="footer-table">
                <tbody>
                    <tr>
                        <th>회사소개</th>
                        <th>이용약관</th>
                        <th>티켓판매안내</th>
                        <th>공지사항</th>
                        <th>고객센터</th>
                    </tr>
                    <tr>
                        
                        <td colspan="2">
                            <p><span>30Ticket</span>(주)</p>
                            <p>서울 강남구 강남대로94길 20 삼오빌딩6층 602호</p>
                            <p>사업자등록번호 123-45-67890</p>
                        </td><td></td>
                        <td colspan="2">
                            <p><span>고객센터</span></p>
                            <p>전화 : 1234-1234</p>
                            <p>팩스 : 02-1234-1234</p>
                            <p>이메일 : 20Ticket@thirtyticket.com</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Footer;
