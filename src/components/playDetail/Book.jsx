import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Book = ({ selectedDate, playData , DateList}) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatLayout, setSeatLayout] = useState([]);

    console.log(playData);
    console.log(DateList);

     useEffect(() => {
        const fetchTheaterData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/theaters/getTheaterInfo", { withCredentials: true });
                
                const theaters = response.data.data;
                const theater = theaters.find(t => t.theaterSeq === DateList[0].theaterSeq);

            if(theater) {
                const totalSeats = theater.seatX * theater.seatY;
                generateSeatLayout(totalSeats);
            } else {
                console.error("해당 극장 정보를 찾을 수 없습니다");
            }
        } catch (error) {
                console.error("데이터를 불러오는데 실패했습니다", error);
            }
        };
        
        fetchTheaterData();
     }, [DateList[0]]);

    const generateSeatLayout = (totalSeats) => {
        const seatsPerColumn = Math.ceil(totalSeats / 3);
        const layout = [[], [], []]; // Three columns

        for (let seat = 1; seat <= totalSeats; seat++) {
            const columnIndex = Math.floor((seat - 1) / seatsPerColumn);
            layout[columnIndex].push(seat);
        }

        setSeatLayout(layout);
    };

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

    const renderSeats = (layout) => (
        layout.map((column, columnIndex) => (
            <div key={columnIndex} className="book-body-seats">
                {column.map((seat) => (
                    <button
                        key={seat}
                        aria-label={`Seat ${seat} ${isSelected(seat) ? "selected" : "available"}`}
                        className={`book-body-seats-content-row-seat ${isSelected(seat) ? "selected" : ""}`}
                        onClick={() => toggleSeat(seat)}
                    >
                        {seat}
                    </button>
                ))}
            </div>
        ))
    );

    return (
        <div>
            <div className='book-header'>
                <div className='book-header-info'>
                    <h1>연극명 : {playData.name} </h1>
                    <h1>상영날짜 : {selectedDate.toLocaleDateString()}</h1>
                    <h1>상영시간 : {DateList[0].startTime}</h1>
                </div>
                <hr className='book-header-hr'/>
                <div className='book-header-text'>
                    <h2>STAGE</h2>
                    <hr/>
                </div>
            </div>
            <div className="book-body">
                <div className="book-body-section1">
                    {renderSeats(seatLayout)}
                </div>
            </div>
        </div>
    );
};

export default Book;