import React from 'react';
import chat from'../../assets/images/매신저.png';
import day from'../../assets/images/기간.png';
import { daysInWeek } from 'date-fns/constants';
const ReserveBtn = ({handleReserveClick,handleConsultClick, handleBookClick}) => {

   

    return (
        <div>
            <div id="fixed-buttons-container" className="fixed-button">
                <div id="reserve-button">
                    <button
                        id="reserve-link"
                        className="button"
                        onClick={handleReserveClick}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',  // 이미지 수직 중앙 정렬
                            padding: '8px 16px',   // 여백 설정
                        }}
                    >
                        <img src={day} style={{width:'25px',filter: 'invert(100%)'}}></img>
                    </button>
                </div>
                <div id="consult-button">
                    <button
                        id="consult-link"
                        className="button"
                        onClick={handleConsultClick}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',  // 이미지 수직 중앙 정렬
                            padding: '8px 16px',   // 여백 설정
                        }}
                    >
                        <img src={chat} style={{width:'50px',filter: 'invert(100%)'}}></img>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReserveBtn;