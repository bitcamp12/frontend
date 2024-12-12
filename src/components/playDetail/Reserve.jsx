import React from 'react';
import ReactDOM from 'react-dom';
import Book from './Book';

const Reserve = ({ DateList, closeModal, DatePicker, selectedDate, setSelectedDate, ko, playData }) => {

  const openBookPopup = () => {
    const popup = window.open(
      '/reservation-popup',
      'Reservation Popup',
      'width=900,height=700,resizable=false, scrollbars=yes'
    );

    popup.document.write('<div id="popup-root"></div>');

    const link = popup.document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `${window.location.origin}/assets/css/Book.css`;
    popup.document.head.appendChild(link);


    ReactDOM.render(
      <Book closeModal={() => popup.close()} selectedDate={selectedDate} playData={playData} DateList={DateList} />,
      popup.document.getElementById('popup-root')
    );

    popup.onbeforeunload = () => ReactDOM.unmountComponentAtNode(popup.document.getElementById('popup-root'));
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
          <p style={{ textAlign: 'center', fontSize: '15px', marginTop: '10px' }}>선택된 날짜 :<strong>{DateList[0]?.startTime || '없음'}</strong></p>
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
          <input type='button' value='예매하기' id="reserve-button-time" onClick={openBookPopup} />
        </div>

      </div>
    </div>
  );
};

export default Reserve;