import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../assets/css/Main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from 'axios';
import { Link } from 'react-router-dom';

const SaleContainer = () => {

    const [plays, setPlays] = useState([]);

    const formatPrice = (price) => {
        return price ? new Intl.NumberFormat('en-US').format(price) : '0';
    };

     const targetDate = "2024-11-29"

    useEffect(() => {
        const fetchSalePlays = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/playTimeTables/calculateDiscount`, { withCredentials: true });
                if (response.data && response.data.data) {
                    setPlays(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchSalePlays();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return (
        <div className="sale-container">
            <div className="sale-header">
                <h2>오늘의 할인 연극!</h2>
            </div>
            <Swiper
                slidesPerView={6}
                spaceBetween={20}
                slidesPerGroup={6}
                centeredSlides={false}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper2"
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    768: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                    },
                }}
                
            >
                <div className="sale-wrapper">
                    {plays.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="card">
                                <Link to={`/playDetail/${item.playSeq}`}>
                                <img
                                    src={`https://kr.object.ncloudstorage.com/bitcamp-9th-bucket-135/storage/${item.imageFileName}`}
                                    alt={item.name}
                                />
                                </Link>
                            </div>
                            <div className="sale-content">
                                <h3 className="sale-content-title">{item.name}</h3>
                                <p className="sale-content-content">{item.ageLimit}이상 관람가능</p>
                                <p className="sale-content-content">{formatDate(item.startDate)} ~ {formatDate(item.endDate)}</p>
                                <h4>
                                    <span>{Math.floor(item.discountRate)}% </span>{formatPrice(Math.floor(item.discountedPrice))}원
                                </h4>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    );
};

export default SaleContainer;