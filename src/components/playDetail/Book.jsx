import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Book = ({ selectedDate, playData, DateList }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatLayout, setSeatLayout] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);

    useEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const playTimeTableSeq = DateList[0]?.playTimeTableSeq; // Ensure you're getting the correct playTimeTableSeq
                console.log("Fetching booked seats for playTimeTableSeq:", playTimeTableSeq);

                const response = await axios.get("http://localhost:8080/api/books/getBookedSeats", {
                    params: { playTimeTableSeq },
                    withCredentials: true
                });

                console.log("Response data:", response.data);
                const bookedSeats = response.data.data;
                console.log("Booked seats:", bookedSeats);

                setBookedSeats(bookedSeats); // Store booked seats
            } catch (error) {
                console.error("Failed to fetch booked seats", error);
            }
        };

        // Call the function only if playTimeTableSeq is available
        if (DateList[0]?.playTimeTableSeq) {
            fetchBookedSeats();
        }
    }, [DateList[0]]);

    useEffect(() => {
        const fetchTheaterData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/theaters/getTheaterInfo", { withCredentials: true });
                const theaters = response.data.data;
                const theater = theaters.find(t => t.theaterSeq === DateList[0].theaterSeq);

                if (theater) {
                    const { seatX, seatY } = theater;
                    generateSeatLayout(seatX, seatY);
                } else {
                    console.error("해당 극장 정보를 찾을 수 없습니다");
                }
            } catch (error) {
                console.error("데이터를 불러오는데 실패했습니다", error);
            }
        };

        fetchTheaterData();
    }, [DateList[0]]);

    const generateSeatLayout = (seatX, seatY) => {
        const totalSeats = seatX * seatY;
        const seatsPerColumn = totalSeats / 4; // Divide seats into 4 columns
        const layout = [[], [], [], []];

        for (let seat = 1; seat <= totalSeats; seat++) {
            const columnIndex = Math.floor((seat - 1) / seatsPerColumn); // Determine column
            layout[columnIndex].push(seat);
        }

        // Format each column into rows of 5x5
        const formattedLayout = layout.map(column =>
            column.reduce((rows, seat, index) => {
                if (index % 5 === 0) rows.push([]); // Start a new row every 5 seats
                rows[rows.length - 1].push({ seat, isBooked: false }); // Add seat object with isBooked
                return rows;
            }, [])
        );

        setSeatLayout(formattedLayout);
        console.log("Generated seat layout:", formattedLayout);
    };

    const isSeatBooked = (seatX, seatY) => {
        return bookedSeats.some((bookedSeat) => {
            // Parse the booked_x and booked_y as integers
            const bookedX = parseInt(bookedSeat.bookedX, 10);
            const bookedY = parseInt(bookedSeat.bookedY, 10);

            // Check if the parsed values are valid numbers
            if (isNaN(bookedX) || isNaN(bookedY)) {
                console.error(`Invalid booked coordinates: booked_x = ${bookedSeat.booked_x}, booked_y = ${bookedSeat.booked_y}`);
                return false;
            }
            return bookedX === seatX && bookedY === seatY;
        });
    };

    const toggleSeat = (seatNumber) => {
        setSelectedSeats((prev) =>
            prev.includes(seatNumber)
                ? prev.filter((seat) => seat !== seatNumber) // Deselect
                : [...prev, seatNumber] // Select
        );
    };

    const isSelected = (seatNumber) => selectedSeats.includes(seatNumber);

    const renderSeats = (layout) => {
        console.log("Rendering seats...");
        return (
            <div className="book-body-seats">
                {layout.map((column, columnIndex) => (
                    <div key={columnIndex} className="book-body-seats-column">
                        {column.map((row, rowIndex) => (
                            <div key={rowIndex} className="book-body-seats-row">
                                {row.map(({ seat }) => {
                                    const seatX = (seat - 1) % 10; // Assuming 10 seats per row
                                    const seatY = Math.floor((seat - 1) / 10);

                                    console.log(`Seat ${seat} has coordinates: (${seatX}, ${seatY})`);

                                    const isSeatBookedFlag = isSeatBooked(seatX, seatY);

                                    return (
                                        <button
                                            key={`seat-${columnIndex}-${rowIndex}-${seat}`}
                                            aria-label={`Seat ${seat} ${isSeatBookedFlag ? "booked" : "available"}`}
                                            className={`book-body-seats-content-row-seat ${isSelected(seat) ? "selected" : ""} ${isSeatBookedFlag ? "booked" : ""}`}
                                            onClick={() => !isSeatBookedFlag && toggleSeat(seat)} // Only toggle if not booked
                                            disabled={isSeatBookedFlag} // Disable if booked
                                        >
                                            {seat}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <div className="book-header">
                <div className="book-header-info">
                    <h1>연극명: {playData.name}</h1>
                    <h1>상영날짜: {selectedDate.toLocaleDateString()}</h1>
                    <h1>상영시간: {DateList[0].startTime}</h1>
                </div>
                <hr className="book-header-hr" />
                <div className="book-header-text">
                    <h2>STAGE</h2>
                    <hr />
                </div>
            </div>
            <div className="book-body">
                <div className="book-body-section1">{renderSeats(seatLayout)}</div>
            </div>
            <hr className='book-body-hr' />
            <div className='book-footer-info'>
                <h1>선택한 좌석: {selectedSeats.join(", ")}</h1>
                <h1>총 금액: {selectedSeats.length * playData.price}원</h1>
                <button className='book-button'>예매하기</button>
            </div>
        </div>
    );
};

export default Book;