import React from 'react';
import { useState } from 'react';

const Reserve = ({activeButton,handleButtonClick,DateList, closeModal, DatePicker, selectedDate, setSelectedDate, ko }) => {
  
  const [selectedTime, setSelectedTime] = useState(null);// 선택된 data-time 값 저장
console.log(selectedTime);



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
          <p style={{ textAlign: 'center', fontSize: '15px', marginTop: '30px' }}>남은 좌석 : <strong>70</strong></p>
          <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '-10px' }}>
            OP석 <strong>5</strong> /
            R석 <strong>15</strong> /
            S석 <strong>20</strong> /
            A석 <strong>30</strong> /
          </p>
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
          <input type='button' value='예매하기' id="reserve-button-time" />
        </div>

      </div>
    </div>
  );
};

export default Reserve;