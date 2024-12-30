import React from 'react';
import "../assets/css/Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div id="footer">
            <div className="footer-row header">
                <div>회사소개</div>
                <div>이용약관</div>
                <div>개인정보처리방침</div>
                <div>티켓판매안내</div>
                <div>티켓판매규칙</div>
                <div><Link to="/notice" className='noticeLink'>공지사항</Link></div>
                <div>고객센터</div>
            </div>
            <div className="footer-row">
                <div className="footer-info company-info" style={{ flex: 2 }}>
                    <h2><span>(주)30Ticket</span></h2>
                    <p>서울 강남구 강남대로94길 20 삼오빌딩6층 602호</p>
                    <p>사업자등록번호 123-45-67890</p>
                    <p>통신판매업신고 2024-강남-1234</p>
                    <p>관광사업증 등록번호 : 제2024-123456호</p>
                    <p>호스팅서비스제공자 (주)30티켓｜대표이사 정건우</p>
                </div>
                <div className="footer-info customer-info" style={{ flex: 2 }}>
                    <h2><span>고객센터</span></h2>
                    <p>전화 1234-1234</p>
                    <p>팩스 02-1234-1234</p>
                    <p>이메일 help30ticket@thirtyticket.com</p>
                    <p>티켓 1:1 문의</p>
                </div>
                <div className="footer-info payment-info" style={{ flex: 2 }}>
                    <h2><span>전자금융거래 분쟁처리 담당</span></h2>
                    <p>전화 1234-1234</p>
                    <p>팩스 02-1234-5678</p>
                    <p>이메일 solution30ticket@thirtyticket.com</p>
                    <p>개인정보보호책임자 cpo@thirtyticket.com</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;