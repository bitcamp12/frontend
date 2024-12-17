import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Book = ({ selectedDate, playData, DateList, popupRef }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatLayout, setSeatLayout] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const playTimeTableSeq = DateList[0]?.playTimeTableSeq; // 올바른 playTimeTableSeq를 가져오는지 확인
                console.log("playTimeTableSeq에 대한 예약 좌석 가져오기:", playTimeTableSeq);

                const response = await axios.get("http://localhost:8080/api/books/getBookedSeats", {
                    params: { playTimeTableSeq },
                    withCredentials: true
                });

                console.log("응답 데이터:", response.data);
                const bookedSeats = response.data.data;
                console.log("예약된 좌석:", bookedSeats);

                setBookedSeats(bookedSeats); // 예약된 좌석을 저장
            } catch (error) {
                console.error("예약 좌석을 가져오는 데 실패했습니다", error);
            }
        };

        // playTimeTableSeq가 있을 때만 호출
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
                    generateSeatLayout(seatX, seatY); // 좌석 배치를 생성
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
        const seatsPerColumn = totalSeats / 4; // 좌석을 4개의 열로 나눔
        const layout = [[], [], [], []];

        for (let seat = 1; seat <= totalSeats; seat++) {
            const columnIndex = Math.floor((seat - 1) / seatsPerColumn); // 열을 계산
            layout[columnIndex].push(seat);
        }

        // 각 열을 5x5 크기의 행으로 포맷
        const formattedLayout = layout.map(column =>
            column.reduce((rows, seat, index) => {
                if (index % 5 === 0) rows.push([]); // 5개의 좌석마다 새로운 행 시작
                rows[rows.length - 1].push({ seat, isBooked: false }); // isBooked가 false인 좌석 객체 추가
                return rows;
            }, [])
        );

        setSeatLayout(formattedLayout);
        console.log("생성된 좌석 배치:", formattedLayout);
    };

    const isSeatBooked = (seatX, seatY) => {
        return bookedSeats.some((bookedSeat) => {
            // 예약된 좌석의 좌표를 정수로 변환
            const bookedX = parseInt(bookedSeat.bookedX, 10);
            const bookedY = parseInt(bookedSeat.bookedY, 10);

            // 변환된 값이 유효한 숫자인지 확인
            if (isNaN(bookedX) || isNaN(bookedY)) {
                console.error(`잘못된 예약 좌석 좌표: booked_x = ${bookedSeat.bookedX}, booked_y = ${bookedSeat.bookedY}`);
                return false;
            }
            return bookedX === seatX && bookedY === seatY; // 좌석이 예약되었는지 확인
        });
    };

    const toggleSeat = (seatNumber) => {
        setSelectedSeats((prev) => {
            if (prev.length >= 5 && !prev.includes(seatNumber)) {
                setErrorMessage("최대 5개의 좌석만 선택할 수 있습니다.");

                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);

                return prev;
            } else {
                setErrorMessage("");
            }

            return prev.includes(seatNumber)
                ? prev.filter((seat) => seat !== seatNumber)
                : [...prev, seatNumber];
        });
    };

    const isSelected = (seatNumber) => selectedSeats.includes(seatNumber); // 좌석이 선택되었는지 확인

    const purchaseSeats = async () => {
        if (selectedSeats.length === 0) {
            setErrorMessage("최소 1개의 좌석을 선택해야 합니다.");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        try {

            const transformSeats = selectedSeats.map((seat) => {
                const bookedX = (seat - 1) % 10;
                const bookedY = Math.floor((seat - 1) / 10);
                const playTimeTableSeq = DateList[0]?.playTimeTableSeq;
                const discountedPrice = DateList[0]?.discountedPrice;
                const totalPrice = selectedSeats.length * discountedPrice;
                return { playTimeTableSeq, bookedX, bookedY, memberSeq:1, totalPrice };
            });

            const response = await axios.post("http://localhost:8080/api/books/purchaseSeats",
                transformSeats,
                { withCredentials: true }
            );

            console.log("Backend Response:", response.data);

            if (response.data.message === "성공") {
                setSelectedSeats([]);
                if(popupRef.current) {
                    popupRef.current.alert("예매가 완료되었습니다.");
                    popupRef.current.close();
                }
            } else {
                if(popupRef.current) {
                    popupRef.current.alert(`예매에 실패: ${response.data.message}`); // Show alert in the popup window
                }
            }
        } catch (error) {
            console.error("예매 중 오류가 발생했습니다", error);
            alert("예매에 실패했습니다, 다시 시도해주세요.");
        }
    };

        const renderSeats = (layout) => {
            return (
                <div className="book-body-seats">
                    {layout.map((column, columnIndex) => (
                        <div key={columnIndex} className="book-body-seats-column">
                            {column.map((row, rowIndex) => (
                                <div key={rowIndex} className="book-body-seats-row">
                                    {row.map(({ seat }) => {
                                        const seatX = (seat - 1) % 10; // 한 행에 10개의 좌석이 있다고 가정
                                        const seatY = Math.floor((seat - 1) / 10);

                                        const isSeatBookedFlag = isSeatBooked(seatX, seatY);

                                        return (
                                            <button
                                                key={`seat-${columnIndex}-${rowIndex}-${seat}`}
                                                aria-label={`좌석 ${seat} ${isSeatBookedFlag ? "예약됨" : "이용 가능"}`}
                                                className={`book-body-seats-content-row-seat ${isSelected(seat) ? "selected" : ""} ${isSeatBookedFlag ? "booked" : ""}`}
                                                onClick={() => !isSeatBookedFlag && toggleSeat(seat)} // 예약되지 않은 좌석만 선택 가능
                                                disabled={isSeatBookedFlag} // 예약된 좌석은 선택 불가
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
                        <h1>연극명 : {playData.name}</h1>
                        <h1>상영날짜 : {selectedDate.toLocaleDateString()}</h1>
                        <h1>상영시간 : {DateList[0].startTime}</h1>
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
                    <h1>총 금액: {selectedSeats.length * DateList[0].discountedPrice}원</h1>
                    <button className='book-button' onClick={purchaseSeats}>예매하기</button>
                </div>
                <div className='error-message'>
                    {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
                </div>
            </div>
        );
    };

    export default Book;