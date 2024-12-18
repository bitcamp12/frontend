import React from 'react';

const Reserve = ({DateList, closeModal, DatePicker, selectedDate, setSelectedDate, ko }) => {
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
      />

      {/* 두 번째 버튼 */}
      <input 
        type="button" 
        value={DateList[1]?.startTime || '없음'} 
        id="reserve-button-time-left" 
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