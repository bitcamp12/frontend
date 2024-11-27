import React from 'react';

const PalySaleinfo = () => {
    return (
        <div id="palySaleInfoContainer">
            <section id="companyInfo">
                <h2>기획사 정보</h2>
                <table className="infoTable">
                    <thead>
                        <tr>
                            <th>주최</th>
                            <td>㈜비트캠프엔터테인먼트</td>
                        </tr>
                        <tr>
                            <th>제작</th>
                            <td>(주)비트캠프컴퍼니</td>
                        </tr>
                        <tr>
                            <th>예매 및 공연문의</th>
                            <td>털이티켓 1544-1555</td>
                        </tr>
                    </thead>
                </table>
            </section>

            <section id="productInfo">
                <h2>상품 관련 정보</h2>
                <table className="infoTable">
                    <thead>
                        <tr>
                            <th>주최/기획</th>
                            <td>(주) 비트캠프뮤지컬컴퍼니</td>
                        </tr>
                        <tr>
                            <th>고객문의</th>
                            <td>1544-1555</td>
                        </tr>
                        
                       
                        <tr>
                            <th>예매수수료</th>
                            <td>장당 2,000원</td>
                        </tr>
                        <tr>
                            <th>배송료</th>
                            <td>현장수령 무료 (배송불가)</td>
                        </tr>
                        <tr>
                            <th>유효기간/이용조건</th>
                            <td>[공연기간 데이터] 예매한 공연 날짜, 회차에 한해 이용 가능</td>
                        </tr>
                        <tr>
                            <th>예매취소조건</th>
                            <td>취소일자에 따라서 아래와 같이 취소수수료가 부과됩니다. 예매 일 기준보다 관람일 기준이 우선 적용됩니다. 단, 예매 당일 밤 12시 이전 취소 시에는 취소수수료가 없으며, 예매 수수료도 환불됩니다.</td>
                        </tr>
                        <tr>
                            <th>취소일에 따른 취소수수료 안내</th>
                            <td>
                                예매 후 7일 이내 : 없음<br />
                                예매 후 8일~관람일 10일전까지 : 장당 4,000원(티켓금액의 10%한도)<br />
                                관람일 9일전~7일전까지 : 티켓금액의 10%<br />
                                관람일 6일전~3일전까지 : 티켓금액의 20%<br />
                                관람일 2일전~1일전까지 : 티켓금액의 30%
                            </td>
                        </tr>
                    </thead>
                </table>
            </section>

            <section id="sellerInfo">
                <h2>판매자 정보</h2>
                <table className="infoTable">
                    <thead>
                        <tr>
                            <th>상호</th>
                            <td>(주) 비트캠프뮤지컬컴퍼니</td>
                        </tr>
                        <tr>
                            <th>대표자명</th>
                            <td>비트캠프</td>
                        </tr>
                        <tr>
                            <th>사업자등록번호</th>
                            <td>105-87-28060</td>
                        </tr>
                        <tr>
                            <th>E-mail</th>
                            <td>bitcamp@emkm.co.kr</td>
                        </tr>
                        <tr>
                            <th>연락처</th>
                            <td>02-6391-6333</td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>서울특별시 강남구</td>
                        </tr>
                    </thead>
                </table>
            </section>

            <section id="notice">
                <h2>예매 유의사항</h2>
                <ul className="noticeList">
                    <li>다른 이용자의 원활한 예매 및 취소에 지장을 초래할 정도로 반복적인 행위를 지속하는 경우 회원의 서비스 이용을 제한할 수 있습니다.</li>
                    <li>일부 상품의 판매 오픈 시 원활한 서비스 제공을 위하여 인터파크페이, I-point, NOL 포인트, 문화예매권 등의 특정 결제수단 이용이 제한될 수 있습니다.</li>
                    <li>티켓 수령 안내: 예약 번호 입장 공연 당일 현장 교부처에서 예약번호 및 본인 확인 후 티켓을 수령하실 수 있습니다.</li>
                    <li>티켓 배송: 예매완료(결제익일) 기준 4~5일 이내에 배송됩니다. (주말, 공휴일을 제외한 영업일 기준)</li>
                </ul>
            </section>
        </div>
    );
};

export default PalySaleinfo;
