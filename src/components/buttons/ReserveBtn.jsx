import React from 'react';

const ReserveBtn = ({handleReserveClick,handleConsultClick}) => {

   

    return (
        <div>
            <div id="fixed-buttons-container">
        <div id="reserve-button">
          <input
            type="button"
            value="예매"
            id="reserve-link"
            className="button"
            onClick={handleReserveClick}
          />
        </div>
        <div id="consult-button">
          <input
            type="button"
            value="상담"
            id="consult-link"
            className="button"
            onClick={handleConsultClick}
          />
        </div>
        
      </div>
        </div>
    );
};

export default ReserveBtn;