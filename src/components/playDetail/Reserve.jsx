import React from 'react';

const Reserve = ({closeModal,DatePicker,selectedDate,setSelectedDate,ko}) => {
    return (
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
    );
};

export default Reserve;