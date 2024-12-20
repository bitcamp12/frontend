
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Book from './Book';
import { useNavigate, useParams } from 'react-router';

const Reserve = ({ DateList, closeModal, DatePicker, selectedDate, setSelectedDate, ko, playData }) => {
  const [selectedTime, setSelectedTime] = useState(null);// 선택된 data-time 값 저장
  const { playSeq } = useParams();
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const openBookPopup = () => {
    // Check if the popup is already open and not closed
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus(); // Focus the existing popup if it's already open
      return;
    }

    // Open the popup with dynamic URL and window properties
    const popup = window.open(
      '', // Empty URL to prevent redirection
      'bookTicketPopup',
      'width=1100,height=750,resizable=false, scrollbars=false'
    );

    // Store the popup reference
    popupRef.current = popup;

    // Wait for the popup to load and then add content
    setTimeout(() => {
      popup.document.write('<div id="popup-root"></div>');


      const link = popup.document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = `${window.location.origin}/assets/css/Book.css`;
      popup.document.head.appendChild(link);

      // Use React 18's createRoot instead of ReactDOM.render to mount the Book component
      const root = ReactDOM.createRoot(popup.document.getElementById('popup-root'));
      root.render(
        <Book closeModal={() => popup.close()} selectedDate={selectedDate} playData={playData} DateList={DateList}  popupRef={popupRef} navigate={navigate}/>
      );
    }, 100);

    // Clean up when the popup is closed
    popup.onbeforeunload = () => {
      if (popupRef.current) {
        popupRef.current = null;
      }
    };
  };

  console.log(DateList[0])

  return (
    <div id="reserve-modal" className="modal">
      <div id="reserve-modal-content" className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        {/* 예매 콘텐츠 */}
        <div style={{ marginTop: '30px' }} id="DatePicker">
          <DatePicker
            selected={selectedDate}
            onChange={date => { setSelectedDate(date); console.log('선택한 날짜:', date) }}
            inline
            locale={ko}  // 한국어 로케일 적용
          />
        </div>
        <div>
          <p style={{ textAlign: 'center', fontSize: '15px', marginTop: '10px' }}>선택된 날짜 : <strong>{DateList[0]?.startTime || '없음'}</strong></p>
        </div>

        <div>

              {/* 첫 번째 버튼 */}
      <input 
        type="button" 
        value={DateList[0]?.startTime || '없음'} 
        id="reserve-button-time-right" 
        className={activeButton === 'reserve-button-time-right' ? 'active' : ''}
        onClick={(e) =>  {

          handleButtonClick('reserve-button-time-right'); // 버튼 활성화 처리
          console.log(e.target.getAttribute('data-time'));
          
          setSelectedTime(e.target.getAttribute('data-time')); // 선택된 시간 업데이트
        }}
        data-time={DateList[0]?.startTime || 0}
      />

      {/* 두 번째 버튼 */}
      <input 
        type="button" 
        value={DateList[1]?.startTime || '없음'} 
        id="reserve-button-time-left" 
        className={activeButton === 'reserve-button-time-left' ? 'active' : ''}
        onClick={(e) => 
        {
          handleButtonClick('reserve-button-time-left');
          console.log(e.target.getAttribute('data-time'));
          setSelectedTime(e.target.getAttribute('data-time')); 
        }
          }
         data-time={DateList[1]?.startTime || 0}
      />
        </div>
        <div>
          <input type='button' value='예매하기' id="reserve-button-time"  onClick={openBookPopup}/>

        
        </div>

      </div>
    </div>
  );
};

export default Reserve;