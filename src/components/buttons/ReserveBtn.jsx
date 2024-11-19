import React from 'react';

const ReserveBtn = ({handleReserveClick,handleConsultClick}) => {

   

    return (
        <div>
            <div id="fixed-buttons-container" className="fixed-button">
                <div id="reserve-button">
                    <button
                        id="reserve-link"
                        className="button"
                        onClick={handleReserveClick}
                    >
                        예매
                    </button>
                </div>
                <div id="consult-button">
                    <button
                        id="consult-link"
                        className="button"
                        onClick={handleConsultClick}
                    >
                        상담
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReserveBtn;