import React, { useState } from 'react';
import "../../assets/css/Book.css";

const Book = ({ closeModal }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const seatLayout = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35],
        [36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45],
        [46, 47, 48, 49, 50],
        [51, 52, 53, 54, 55],
        [56, 57, 58, 59, 60],
        [61, 62, 63, 64, 65],
        [66, 67, 68, 69, 70],
        [71, 72, 73, 74, 75],
    ];

    // Toggles the selection state of a seat
    const toggleSeat = (seatNumber) => {
        setSelectedSeats((prev) =>
            prev.includes(seatNumber)
                ? prev.filter((seat) => seat !== seatNumber) // Deselect
                : [...prev, seatNumber] // Select
        );
    };

    // Checks if a seat is selected
    const isSelected = (seatNumber) => selectedSeats.includes(seatNumber);

    const renderSeats = (rows) => (
        rows.map((row, rowIndex) => (
            <div key={rowIndex} className='book-modal-body-seats-content-row'>
                {row.map((seat) => (
                    <button
                        aria-label={`Seat ${seat} ${isSelected(seat) ? "selected" : "available"}`}
                        key={seat}
                        className={`book-modal-body-seats-content-row-seat ${isSelected(seat) ? "selected" : ""}`}
                        onClick={() => toggleSeat(seat)}
                    >
                        {seat}
                    </button>
                ))}
            </div>
        ))
    );

    return (
        <div id='book-modal' className='book-modal'>
            <div id='book-modal-content' className='book-modal-content'>
                <span className="book-close" onClick={closeModal}>&times;</span>
                <div className='book-modal-header'>
                    <div className='book-modal-header-text'>
                        <h2>STAGE</h2>
                        <hr />
                    </div>
                </div>
                <div className='book-modal-body'>
                    <div className='book-modal-body-seats-section1'>
                        <div className='book-modal-body-seats'>
                            {renderSeats(seatLayout.slice(0, 5))} {/* First 5 rows */}
                        </div>
                        <div className='book-modal-body-seats'>
                            {renderSeats(seatLayout.slice(5, 10))} {/* Next 5 rows */}
                        </div>
                        <div className='book-modal-body-seats'>
                            {renderSeats(seatLayout.slice(10, 15))} {/* Remaining rows */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;