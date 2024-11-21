import React, { useEffect, useState } from 'react';
import paly from '../assets/images/예시포스터.jpg';
import place from '../assets/images/장소.png';
import price from '../assets/images/가격.png';
import star from '../assets/images/별.png';
import duration from '../assets/images/기간.png';
import "../assets/css/PlayDetail.css";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale'; 
import ReserveBtn from './buttons/ReserveBtn';
import ScrollToTop from './buttons/ScrollToTop';
import MainNa from './MainNa';
import Footer from './Footer';
const PlayDetail = () => {
  const [visible, setVisible] = useState([true, false, false, false, false]);
  const [mapVisible, setMapVisible] = useState(false); // 모달 표시 상태 관리
  const [reserveVisible, setReserveVisible] = useState(false); // 예매 모달 표시 상태 관리
  const [consultVisible, setConsultVisible] = useState(false); // 상담 모달 표시 상태 관리
  const [isReviewVisible, setIsReviewVisible] = useState(true); // 기본적으로 후기평 폼을 보이게 설정
  const [isExpectationVisible, setIsExpectationVisible] = useState(false); // 기본적으로 기대평 폼은 숨김
  const {kakao}=window;
 
  const [selectedDate, setSelectedDate] = useState(null);
 
    const [rating, setRating] = useState(0); // 선택된 별점 상태
  
    const ratinghandleClick = (value) => {
      setRating(value); // 클릭한 별점으로 상태 업데이트
    };

  // 후기평 클릭 시
  const handleReviewClick = () => {
    setIsReviewVisible(true);
    setIsExpectationVisible(false);
  };

  // 기대평 클릭 시
  const handleExpectationClick = () => {
    setIsExpectationVisible(true);
    setIsReviewVisible(false);
  };

  
   // 클릭한 항목만 보이도록 상태 변경
   const handleClick = (index) => {
    const updatedVisibility = [false, false, false, false, false]; // 모든 항목 숨기기
    updatedVisibility[index] = true; // 클릭한 항목만 보이게 설정
    setVisible(updatedVisibility); // 상태 업데이트
  };
  // 장소 클릭 시 모달 팝업 띄우기
  const handleMapClick = () => {
    setMapVisible(true); // 모달 보이기
  };

 

  // 모달 닫기
  const closeModal = () => {
    setMapVisible(false); // 지도 모달 숨기기
    setReserveVisible(false); // 예매 모달 숨기기
    setConsultVisible(false); // 상담 모달 숨기기
  };
  // 예매 클릭 시 예매 모달 띄우기
  const handleReserveClick = () => {
    setReserveVisible(true); // 예매 모달 보이기
  };

  // 상담 클릭 시 상담 모달 띄우기
  const handleConsultClick = () => {
    setConsultVisible(true); // 상담 모달 보이기
  };

   

  useEffect(() => {
    if (mapVisible) {
        // 모달이 열릴 때마다 지도 초기화
        const mapContainer = document.getElementById("map"); // 지도 표시 영역
        if (mapContainer) {
            // 카카오맵 초기화
            const mapOption = {
                center: new window.kakao.maps.LatLng(37.5287912, 126.9686735), // 서울의 중심 좌표
                level: 3, // 확대 레벨
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성

            // 마커를 표시할 위치와 title, address 객체
            const position = {
                title: '임시제목',
                latlng: new window.kakao.maps.LatLng(37.5287912, 126.9686735), // 임시 좌표
                address: '임시 주소',
            };

            // 마커와 인포윈도우
            const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
            const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
            const imageSize = new window.kakao.maps.Size(24, 35); 
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); 
            const marker = new window.kakao.maps.Marker({
                map: map,
                position: position.latlng,
                title: position.title,
                image: markerImage,
            });

            // 마커 클릭 이벤트
            window.kakao.maps.event.addListener(marker, 'click', function() {
                const content = `
                    <div id="info" style="padding:5px;">
                        <p style="font-size: 15px; font-weight: bold;">${position.title}</p>
                        주소: ${position.address}<br>
                    </div>
                `;
                infowindow.setContent(content);
                infowindow.open(map, marker);
            });
        }
    }
}, [mapVisible]); // mapVisible이 변경될 때마다 실행
  

  return (
    <>
    <MainNa/>
    <div id="play-detail-container">
      <div id='plat-info-table'>
      <table id="play-detail-table">
        <tbody>
          <tr>
            <td id="play-subject"><h2>제목</h2></td>
          </tr>
          <tr>
            <td><p>연극 주간 50위</p></td>
          </tr>
          <tr>
            <td rowSpan="15" id="image-column">
              <img src={paly} alt="이미지" id='image-column-image'/>
            </td>
          </tr>

          <tr><td></td></tr>
          <tr><td></td></tr>

          <tr>
            <td id="place-column" >
       
              <img src={place} alt="장소" id="place-image"  onClick={handleMapClick}/> : <span  onClick={handleMapClick}>장소</span> 

              
              
            </td>
          </tr>
         
          <tr>
            <td id="duration-column">
              <img src={duration} alt="기간" id="duration-image" /> : 기간
            </td>
          </tr>
          <tr>
            <td id="price-column">
              <img src={price} alt="가격" id="price-image" /> : 가격
            </td>
          </tr>
          <tr>
            <td id="rating-column">
              <img src={star} alt="별점" id="rating-image" /> : 별점
            </td>
          </tr>
          
          <tr><td></td></tr>
          <tr><td></td></tr>
          <tr><td></td></tr>
          <tr><td></td></tr>
        </tbody>
      </table>
      </div>

      <div style={{zIndex:'10000'}}> 
        <ScrollToTop />
      <ReserveBtn handleReserveClick={handleReserveClick} handleConsultClick={handleConsultClick}/> 
    </div>
     
      
      <div id="additional-info-container">
        <table id="info-table">
          <tbody>
          <tr style={{ display: 'flex', justifyContent: 'center' }}>
  {['공연정보', '판매정보', '캐스팅', '후기/기대평', 'Q&A'].map((label, index) => (
    <td
      key={index}
      onClick={() => handleClick(index)}
      style={{
        flex: 1, // 동일한 비율로 분배
        textAlign: 'center', // 텍스트 중앙 정렬
        backgroundColor: visible[index] ? '#8E43E7' : 'transparent',
        color: visible[index] ? 'white' : 'black',
        borderBottom: '1px solid #ccc',
        padding: '10px 0', // 위아래 여백
        cursor: 'pointer', // 클릭 가능한 스타일
      }}
    >
      {label}
    </td>
  ))}
</tr>
          
            <tr>
              <td colSpan="5">
                {visible[0] && <div>공연정보 내용</div>}
                {visible[1] && <div>판매정보 내용</div>}
                {visible[2] && <div>캐스팅 내용</div>}
                {visible[3] && <div>
                  <table id="reviews-table">
                    <thead>
                    <tr>
          <td
            id="review-title"
            onClick={handleReviewClick}
            style={{
              backgroundColor: isReviewVisible ? '#8E43E7' : 'transparent',
              color: isReviewVisible ? 'white' : 'black',
              width:'60px',
              fontSize: '10px'
            }}
          >
            후기평
          </td>
          <td
            id="expectation-title"
            onClick={handleExpectationClick}
            style={{
              backgroundColor: isExpectationVisible ? '#8E43E7' : 'transparent',
              color: isExpectationVisible ? 'white' : 'black',
               width:'60px',
               fontSize: '10px'
            }}
          >
            기대평
          </td>
          <td ></td>
        
                        <td id="latest-order" style={{ width:'60px',fontSize: '10px'}}>최신순</td>
                        <td id="rating-order" style={{ width:'60px',fontSize: '10px'}}>별점순</td>
                      </tr>
                    </thead>


                  </table>  
                  <hr style={{ width: '100%', borderTop: '1px solid #ccc', margin: '-3px 0' }} />
                  <div>

                      {isReviewVisible && (
                        <table id="review-form" style={{width:'100%'}}>
  <tbody>
    <tr>
      <div id="review-container">

        <div className="rating-container" style={{ textAlign: 'left', margin:'10px 20px' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className="star"
              style={{
                cursor: 'pointer',
                color: value <= rating ? 'gold' : 'gray', // 선택된 별은 금색, 나머지는 회색
                fontSize: '40px',
              }}
              onClick={() => ratinghandleClick(value)} // 별점 클릭 시 handleClick 호출
            >
              ★
            </span>
          ))}
        </div>

        <div className="input-container" style={{ marginBottom: '10px' }}>
          <input
            type="text"
            id="rating-field"
            name="review-content"
            placeholder="리뷰를 입력하세요"
            className="review-input"
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <input
            type="button"
            value="등록하기"
            id="submit-btn"
            className="submit-btn"
          />
        </div>

      </div>
    </tr>
    
    <tr>
      <td id="review-details">
        <div id="review-info">
          <h1 id="user-info">아이디 | 기간 | 별점</h1>
          <h2 id="review-content">내용</h2>
        </div>
      </td>
    </tr>
  </tbody>
</table>
                      )}

                      {isExpectationVisible && (
                        <table id="expectation-form" style={{width:'100%'}}>
                        <tbody>
                          <tr>
                            <td>
                      
                              <div className="input-container" style={{ marginBottom: '10px' }}>
                                <input
                                  type="text"
                                  id="expectation-field"
                                  name="expectation-content"
                                  placeholder="리뷰를 입력하세요"
                                  className="review-input"
                                />
                              </div>
                      
                              <div style={{ textAlign: 'right' }}>
                                <input
                                  type="button"
                                  value="등록하기"
                                  id="submit-btn"
                                  className="submit-btn"
                                />
                              </div>
                      
                            </td>
                          </tr>
                      
                          <tr>
                            <td id="review-details">
                              <div id="review-info">
                                <h1 id="user-info">아이디 | 기간</h1>
                                <h2 id="expectation-content">내용</h2>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      )}
                      </div>
                </div>}

                {visible[4] && 
                <div>
                <div>
                  <table style={{ width: '100%' }}>
                    <tr>
                      <td colSpan="2">
                        <div className="form-container">
                          <div className="input-container" style={{ marginBottom: '10px' }}>
                            <input
                              type="text"
                              id="inquiry-field"
                              name="inquiry-content"
                              placeholder="문의 내용을 입력하세요"
                              className="input-field"
                            />
                          </div>
              
                          <div style={{ textAlign: 'right' }}>
                            <input
                              type="button"
                              value="문의하기"
                              id="submit-btn"
                              className="submit-btn"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
              
                    <tr>
                      <td>
                      <div id="review-info">
                                <h1 id="user-info">아이디 | 기간</h1>
                                <h2 id="expectation-content">내용</h2>
                              </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              
              }
              </td>
            </tr>

            
          </tbody>
        </table>
      </div>

      {/* 지도 모달 팝업 */}
      {mapVisible && (
  <div id="map-modal" className="modal">
    <div id="map-modal-content" className="modal-content">
      <span className="close" onClick={closeModal}>&times;</span>
      {/* 지도 콘텐츠 */}
      <h2>지도</h2>
      <h4>주소</h4>
      <div id='map-div'
        style={{
          display: 'flex',
          justifyContent: 'center', // 가로 중앙 정렬
          alignItems: 'center', // 세로 중앙 정렬
          height: '500px', // 부모 div의 높이를 지정
        }}
      >
        <div id="map" style={{ width: '500px', height: '500px' }}></div>
      </div>
    </div>
  </div>
)}

      {/* 예매 모달 팝업 */}
      {reserveVisible && (
        <div id="reserve-modal" className="modal">
          <div id="reserve-modal-content" className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {/* 예매 콘텐츠 */}
            <h2>날짜 선택</h2>
            <div style={{marginTop:'50px'}} id="DatePicker">
            <DatePicker
              selected={selectedDate}
              onChange={date => {setSelectedDate(date);  console.log('선택한 날짜:', date)}}
              inline
              locale={ko}  // 한국어 로케일 적용
            />
            </div>
            <div>

            <h4 style={{textAlign:'left',marginLeft:'20px',fontSize:'14px'}}>남은 좌석 : </h4>
            </div>
            
            <div>
              <input type='button'value='시간대' id="reserve-button-time-right"/>
              <input type='button'value='시간대'id="reserve-button-time-left" />
            </div>
            <div>
              <input type='button'value='예매하기'id="reserve-button-time" />
              </div>
            
          </div>
        </div>
      )}

      {/* 상담 모달 팝업 */}
      {consultVisible && (
        <div id="consult-modal" className="modal">
          <div id="consult-modal-content" className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {/* 상담 콘텐츠 */}
            상담 정보
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default PlayDetail;
