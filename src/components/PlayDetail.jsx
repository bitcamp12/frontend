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
import ReviewBefore from './playDetail/ReviewBefore';
import ReviewAfter from './playDetail/ReviewAfter';
import QA from './playDetail/QA';
import Reserve from './playDetail/Reserve';
import { useParams } from 'react-router';
import axios, { Axios } from 'axios';
import { useLocation } from 'react-router';

const PlayDetail = () => {
  const [visible, setVisible] = useState([true, false, false, false, false]);
  const [mapVisible, setMapVisible] = useState(false); // 모달 표시 상태 관리
  const [reserveVisible, setReserveVisible] = useState(false); // 예매 모달 표시 상태 관리
  const [consultVisible, setConsultVisible] = useState(false); // 상담 모달 표시 상태 관리
  const [isReviewVisible, setIsReviewVisible] = useState(true); // 기본적으로 후기평 폼을 보이게 설정
  const [isExpectationVisible, setIsExpectationVisible] = useState(false); // 기본적으로 기대평 폼은 숨김
  const [reviewText, setReviewText] = useState(''); // 리뷰 텍스트 상태
  const [selected, setSelected] = useState('latest');
    const[alertVisible,setAlertVisible]=useState(false);
    const [isReviewUpdate,setIsReviewUpdate]=useState(false);

    const [modalTitle, setModalTitle] = useState(''); // 모달 제목
    const [modalMessage, setModalMessage] = useState(''); // 모달 메시지

  const handleSelect = (order) => {
    setSelected(order);
  };

  const { kakao } = window;

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
    setAlertVisible(false)//알림 모달 숨기기
    setIsReviewUpdate(false)//수정 모달 숨기기
  };
  // 예매 클릭 시 예매 모달 띄우기
  const handleReserveClick = () => {
    setReserveVisible(true); // 예매 모달 보이기
  };

  // 상담 클릭 시 상담 모달 띄우기
  const handleConsultClick = () => {
    setConsultVisible(true); // 상담 모달 보이기
  };



  const location = useLocation();  // 현재 URL 정보 가져오기
  const queryParams = new URLSearchParams(location.search);  // 쿼리 파라미터 추출
  const playSeq = queryParams.get('playSeq');  // playSeq 값 추출
/////////공영정보 불러오기   
 
const [playData, setPlayData] = useState(null); // 초기값을 null로 설정
const formatDate = dateStr => {
  // ISO 문자열을 Date 객체로 변환
  const date = new Date(dateStr);
  // 연도, 월, 일 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0'); // 일자를 2자리로 포맷

  return `${year}.${month}.${day}`;
};
useEffect(() => {
  console.log(playSeq);

  axios
    .get(`http://localhost:8080/api/plays/getPlayOne?playSeq=${playSeq}`, {
      withCredentials: true,
    })
    .then(response => {
      const { status, data } = response.data; // 구조 분해 할당
      console.log(response.data);

      if (status === 200) {
        setPlayData(data); // 상태 업데이트
      } else if (status === 400) {
        setModalTitle("없음")
        setModalMessage("해당 공연 정보는 존재하지않습니다")
        setAlertVisible(true)
      }
    })
    .catch(error => {
      console.error('API 요청 중 오류 발생:', error);
      alert('요청 중 문제가 발생했습니다. 다시 시도해주세요.');
    });
}, [playSeq]); // playSeq 변경 시마다 실행
/////////공영정보 불러오기


/////////리뷰 불러오기
const fetchReviewData = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/reviewAfters/ReviewAList?playSeq=${playSeq}`);
    console.log(response.data);

    const { status, data } = response.data; // 구조 분해 할당
    if (status === 200) {
      setReviewData(data); // 상태 업데이트
    } else if (status === 404) {
      console.log('리뷰 없음');
    }
  } catch (error) {
    console.error('리뷰 데이터를 가져오는 중 오류 발생:', error);
  }
};



const [reviewData, setReviewData] = useState(null); // 초기값을 null로 설정
useEffect(() => {
  fetchReviewData(); // 함수 호출
}, [playSeq]); // playSeq가 변경될 때마다 호출


/////////리뷰 불러오기


////리뷰 등록
const handleSubmit = async () => {
  if (!reviewText.trim()) {
       setModalTitle("유효성")
        setModalMessage("리뷰 내용을 입력해주세요.")
        setAlertVisible(true)
    return;
  }
  if (rating === 0) {
    setModalTitle("유효성")
        setModalMessage("별점을 선택해주세요.")
        setAlertVisible(true)
    return;
  }

  // 데이터 객체 생성
  const reviewData = {
    content: reviewText,
    rating: rating,
  }
 
    // 서버로 데이터 전송
    axios.post(`http://localhost:8080/api/reviewAfters/ReviewA?playSeq=${playSeq}`, reviewData, {
      withCredentials: true,
    }).then(response=>{

      if (response.status === 200) {
        setAlertVisible(true)
        setModalTitle("성공") 
        setModalMessage('리뷰가 등록 되었습니다'); // 입력 필드 초기화
        setReviewText(''); // 입력 필드 초기화
        setRating(0); // 별점 초기화
        fetchReviewData();
      } else if(response.status === 500){
        setAlertVisible(true)
        setModalTitle("실패")
        setModalMessage('리뷰 등록에 실패했습니다. 다시 시도해주세요.'); // 입력 필드 초기화
        setRating(0); // 별점 초기화
      }
    } 
  )
    

}

////리뷰 등록
/////리뷰 수정 모달 열기
const [selectedReviewSeq, setSelectedReviewSeq] = useState(null); // 선택된 리뷰 ID
const handleEditClick = (reviewSeq) => {
  const selectedReview = reviewData.find((review) => review.reviewAfterSeq === reviewSeq);
  if (selectedReview) {
    setSelectedReviewSeq(selectedReview.reviewAfterSeq)
    setReviewText(selectedReview.content); // 리뷰 내용 설정
    setRating(selectedReview.rating);     // 별점 설정
    setIsReviewUpdate(true);              // 수정 모달 열기
  }
};
/////

////수정하기

const handleUpdateClick = (e)=>{
  const updatedReview = {
    reviewAfterSeq: e.target.getAttribute('data-review-seq'), // 현재 수정 중인 리뷰의 고유 ID
    content: reviewText,             // 수정된 리뷰 내용
    rating: rating                   // 수정된 별점
  };
  axios
  .put("http://localhost:8080/api/reviewAfters/ReviewA", updatedReview)
  .then((response) => {
    if (response.status === 200) {
      setAlertVisible(true)
      setModalTitle("성공") 
      setModalMessage('리뷰가 수정 되었습니다'); 
      setIsReviewUpdate(false); // 모달 닫기
      fetchReviewData();
      setReviewText(''); // 입력 필드 초기화
        setRating(0); // 별점 초기화
    } else {
      setAlertVisible(true)
      setModalTitle("실패") 
      setModalMessage('리뷰가 수정 실패'); // 입력 필드 초기화
    }
  })
  .catch((error) => {
    console.error("리뷰 수정 중 에러 발생:", error);
  });
}

//////리뷰 삭제
const handleDeleteClick = (reviewSeq) => {
  const reviewDTO = {
    reviewAfterSeq: reviewSeq, // 삭제할 리뷰의 Seq
  };

  // axios.delete로 데이터 전달 시, config 객체 내에 data를 사용하여 요청 본문을 전달
  axios
    .delete("http://localhost:8080/api/reviewAfters/ReviewA", { data: reviewDTO }) // 삭제 요청에 reviewDTO를 body로 전달
    .then((response) => {
      if (response.status === 200) {
        setAlertVisible(true);
        setModalTitle("성공");
        setModalMessage("리뷰가 삭제되었습니다.");
        fetchReviewData();
      } else {
        setAlertVisible(true);
        setModalTitle("실패");
        setModalMessage("리뷰 삭제 실패");
      }
    })
    .catch((error) => {
      console.error("리뷰 삭제 중 오류 발생:", error);
      setAlertVisible(true);
      setModalTitle("오류");
      setModalMessage("리뷰 삭제 중 오류가 발생했습니다.");
    });
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
        window.kakao.maps.event.addListener(marker, 'click', function () {
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







  /////리뷰 기대기대기대
  const [reviewTextB, setReviewTextB] = useState(''); // 리뷰 텍스트 상태
  const [reviewDataB, setReviewDataB] = useState(null); // 초기값을 null로 설정
  const [isReviewUpdateB,setIsReviewUpdateB]=useState(false);
/////////리뷰 불러오기
const fetchReviewBData = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/reviewBefores/reviewBList?playSeq=${playSeq}`);
    console.log(response.data);

    const { status, data } = response.data; // 구조 분해 할당
    if (status === 200) {
      setReviewDataB(data); // 상태 업데이트
    } else if (status === 404) {
      console.log('리뷰 없음');
    }
  } catch (error) {
    console.error('리뷰 데이터를 가져오는 중 오류 발생:', error);
  }
};




useEffect(() => {
  fetchReviewBData(); // 함수 호출
}, [playSeq]); // playSeq가 변경될 때마다 호출
////////리뷰 목록




const handleSubmitB = async () => {
  if (!reviewTextB.trim()) {
       setModalTitle("유효성")
        setModalMessage("리뷰 내용을 입력해주세요.")
        setAlertVisible(true)
    return;
  }


  // 데이터 객체 생성
  const reviewDataB = {
    content: reviewTextB,
  }
 
    // 서버로 데이터 전송
    axios.post(`http://localhost:8080/api/reviewBefores/reviewB?playSeq=${playSeq}`, reviewDataB, {
      withCredentials: true,
    }).then(response=>{

      if (response.status === 200) {
        setAlertVisible(true)
        setModalTitle("성공") 
        setModalMessage('리뷰가 등록 되었습니다'); // 입력 필드 초기화
        setReviewTextB(''); // 입력 필드 초기화
        fetchReviewBData(); // 함수 호출
        
      } else if(response.status === 500){
        setAlertVisible(true)
        setModalTitle("실패")
        setModalMessage('리뷰 등록에 실패했습니다. 다시 시도해주세요.'); // 입력 필드 초기화
        setRating(0); // 별점 초기화
      }
    } 
  )
    

}
////////리뷰 등록

const [selectedReviewSeqB, setSelectedReviewSeqB] = useState(null); // 선택된 리뷰 ID
const handleEditBClick = (reviewSeq) => {
  const selectedReviewB = reviewDataB.find((review) => review.reviewBeforeSeq === reviewSeq);
  if (selectedReviewB) {
    setSelectedReviewSeqB(selectedReviewB.reviewBeforeSeq)
    setReviewTextB(selectedReviewB.content); // 리뷰 내용 설정
    setIsReviewUpdateB(true);              // 수정 모달 열기
  }
};

////수정하기

const handleUpdateBClick = (e)=>{
  const updatedReview = {
    reviewBeforeSeq: e.target.getAttribute('data-review-seq'), // 현재 수정 중인 리뷰의 고유 ID
    content: reviewTextB,             // 수정된 리뷰 내용
  };
  axios
  .put("http://localhost:8080/api/reviewBefores/reviewB", updatedReview)
  .then((response) => {
    if (response.status === 200) {
      setAlertVisible(true)
      setModalTitle("성공") 
      setModalMessage('리뷰가 수정 되었습니다'); 
      setIsReviewUpdateB(false); // 모달 닫기
      setReviewTextB(''); // 입력 필드 초기화
      fetchReviewBData(); // 함수 호출
    } else {
      setAlertVisible(true)
      setModalTitle("실패") 
      setModalMessage('리뷰가 수정 실패'); // 입력 필드 초기화
    }
  })
  .catch((error) => {
    console.error("리뷰 수정 중 에러 발생:", error);
  });
}


//////리뷰 삭제
const handleDeleteClickB = (reviewSeq) => {
  const reviewBDTO = {
    reviewBeforeSeq: reviewSeq, // 삭제할 리뷰의 Seq
  };

  // axios.delete로 데이터 전달 시, config 객체 내에 data를 사용하여 요청 본문을 전달
  axios
    .delete("http://localhost:8080/api/reviewBefores/reviewB", { data: reviewBDTO }) // 삭제 요청에 reviewDTO를 body로 전달
    .then((response) => {
      if (response.status === 200) {
        setAlertVisible(true);
        setModalTitle("성공");
        setModalMessage("리뷰가 삭제되었습니다.");
        fetchReviewData();
        fetchReviewBData(); // 함수 호출
      } else {
        setAlertVisible(true);
        setModalTitle("실패");
        setModalMessage("리뷰 삭제 실패");
      }
    })
    .catch((error) => {
      console.error("리뷰 삭제 중 오류 발생:", error);
      setAlertVisible(true);
      setModalTitle("오류");
      setModalMessage("리뷰 삭제 중 오류가 발생했습니다.");
    });
};

  return (

    <>
      <MainNa />
      <div id="play-detail-container">
        <div id="play-detail-header">
          <h2 id="play-subject">{playData ? playData.name : '임시 제목'}</h2>
          <p>연극 주간 50위</p>
        </div>

        <div id="play-detail-body">
          <div id="image-column">
            <img src={paly} alt="이미지" id="image-column-image" />
          </div>

          <div id="play-info">
            <div className="play-info-column" id="place-column">
              <img src={place} className="play-info-img" alt="장소" id="place-image" onClick={handleMapClick} />
              <label className="play-info-column-header">장소</label><p className="play-info-column-content"><span onClick={handleMapClick}>{playData ? playData.address : '비트캠프'}</span></p>
            </div>

            <div className="play-info-column" id="duration-column">
              <img src={duration} className="play-info-img" alt="기간" id="duration-image" />
              <label className="play-info-column-header">공연기간</label><p className="play-info-column-content"> {playData ? `${formatDate(playData.startTime)} ~ ${formatDate(playData.endTime)}` : '2024.07.01 ~ 2025.01.06'}</p>
            </div>

            <div className="play-info-column" id="time-column">
              <img src={duration} className="play-info-img" alt="기간" id="duration-image" />
              <label className="play-info-column-header">공연시간</label><p className="play-info-column-content">100분</p>
            </div>

            <div className="play-info-column" id="age-column">
              <img src={duration} className="play-info-img" alt="기간" id="duration-image" />
              <label className="play-info-column-header">관람연령</label><p className="play-info-column-content">만 12세 이상</p>
            </div>

            <div className="play-info-column" id="price-column">
              <img src={price} className="play-info-img" alt="가격" id="price-image" />
              <label className="play-info-column-header">가격</label>
              <div className="play-info-column-pricing">
                <div className="play-info-column-pricing-seating">
                  <span className='play-info-column-pricing-seating-seat'>OP석</span><span>90,000원</span>
                </div>
                <div className="play-info-column-pricing-seating">
                  <span className='play-info-column-pricing-seating-seat'>R석</span><span>90,000원</span>
                </div>
                <div className="play-info-column-pricing-seating">
                  <span className='play-info-column-pricing-seating-seat'>S석</span><span>70,000원</span>
                </div>
                <div className="play-info-column-pricing-seating">
                  <span className='play-info-column-pricing-seating-seat'>A석</span><span>40,000원</span>
                </div>
              </div>
            </div>

            <div className="play-info-column" id="rating-column">
              <img src={star} className="play-info-img" alt="별점" id="rating-image" />
              <label className="play-info-column-header">별점 </label><p className="play-info-column-content">5점에 4점</p>
            </div>
          </div>
        </div>

        {/* 버튼 스크롤 */}
        <div style={{ zIndex: '10000' }}>
          <ScrollToTop />
          <ReserveBtn handleReserveClick={handleReserveClick} handleConsultClick={handleConsultClick} />
        </div>
        {/* 버튼 스크롤 */}
      </div>

      <div id="additional-info-container">
        <div className="info-header">
          {['공연정보', '판매정보', '캐스팅', '관람평/기대평', 'Q&A'].map((label, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`info-tab ${visible[index] ? 'active' : ''}`}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="info-content">
          {visible[0] && <div className="info-section">{playData ? playData.description : '공연정보'}</div>}
          {visible[1] && <div className="info-section">판매정보 내용</div>}
          {visible[2] && <div className="info-section">캐스팅 배우 : {playData ? playData.totalActor : '캐스팅 정보'}</div>}
          {visible[3] && (
            <div className="info-section">
              <div className="info-section-board">
                <div className="info-section-board-header">
                  <strong>꼭 읽어주세요</strong>
                </div>
                <div className="info-section-board-content">
                  <p>
                    게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.<br />
                    특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며 전화번호, 이메일 등의 개인정보는 악용될 우려가 있으므로 게시를 삼가 주시기 바랍니다.<br />
                    사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 30 티켓 게시판 작성 권한이 제한됩니다.
                  </p>
                </div>
              </div>
              <div className="reviews-header">
                <div
                  className={`review-tab ${isReviewVisible ? 'active' : ''}`}
                  onClick={handleReviewClick}
                >
                  관람평
                </div>
                <div
                  className={`review-tab ${isExpectationVisible ? 'active' : ''}`}
                  onClick={handleExpectationClick}
                >
                  기대평
                </div>
                <div className="review-tab-filler"></div>
                <div className="order-by">
                  <span
                    id="latest-order"
                    className={selected === 'latest' ? 'selected' : ''}
                    onClick={() => handleSelect('latest')}
                  >
                    최신순
                  </span>
                  <span
                    id="rating-order"
                    className={selected === 'rating' ? 'selected' : ''}
                    onClick={() => handleSelect('rating')}
                  >
                    별점순
                  </span>
                </div>
              </div>
              <hr style={{ width: '100%', borderTop: '2px solid #ccc', margin: '-3px 0' }} />
              <div>
                {isReviewVisible && <ReviewAfter  handleDeleteClick={handleDeleteClick}handleUpdateClick={handleUpdateClick}selectedReviewSeq={selectedReviewSeq} handleEditClick={handleEditClick}isReviewUpdate={isReviewUpdate}setIsReviewUpdate={setIsReviewUpdate} formatDate={formatDate} reviewData={reviewData}handleSubmit={handleSubmit}ratinghandleClick={ratinghandleClick}setRating={setRating} rating={rating} setReviewText={setReviewText} reviewText={reviewText} setAlertVisible={setAlertVisible}/>}
                {isExpectationVisible && <ReviewBefore handleDeleteClickB={handleDeleteClickB} selectedReviewSeqB={selectedReviewSeqB}handleUpdateBClick={handleUpdateBClick} handleEditBClick={handleEditBClick} setIsReviewUpdate={setIsReviewUpdate} isReviewUpdateB={isReviewUpdateB}setIsReviewUpdateB={setIsReviewUpdateB} handleSubmitB={handleSubmitB} reviewDataB={reviewDataB} reviewTextB={reviewTextB} setReviewTextB={setReviewTextB}/>}
              </div>
            </div>
          )}

          {visible[4] && <div className="info-section"><QA /></div>}
        </div>
      </div>
      {alertVisible && (
  <div id="alert-modal" className="modal">
    <div id="alert-modal-content" className="modal-content">
      <table id='alert-table' style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ border: 'none' }}>
              <h3>{modalTitle}</h3>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' ,border: 'none'}}>
              <p>{modalMessage}</p>
            </td>
          </tr>
          <tr>
            <td style={{ border: 'none' }}>
              <button
                style={{
                  backgroundColor: '#8E43E7',
                  color: 'white',
                  border: 'none',
                  width: '100px',
                  borderRadius: '5px',
                  marginLeft: '350px',
                  height: '50px',
                }}
                onClick={closeModal}
              >
                확인
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}

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
        <Reserve closeModal={closeModal} DatePicker={DatePicker} selectedDate={selectedDate} setSelectedDate={setSelectedDate} ko={ko} />
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
      <Footer />
    </>
  );
};

export default PlayDetail;
