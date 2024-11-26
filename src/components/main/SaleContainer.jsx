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

const SaleContainer = () => {

    const [plays, setPlays] = useState([]);

    useEffect(() => {
        const fetchRandomPlays = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/plays/getPlaySale", { withCredentials: true });
                if (response.data && response.data.data) {
                    setPlays(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchRandomPlays();
    }, []);

    return (
        <div className="sale-container">
            <div className="sale-header">
                <h2>할인 마감 임박!</h2>
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
            >
                <div className="sale-wrapper">
                    {plays.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="card">
                                <img
                                    src={`https://kr.object.ncloudstorage.com/bitcamp-9th-bucket-135/storage/${item.imageFileName}`}
                                    alt={item.name}
                                />
                            </div>
                            <div className="sale-content">
                                <p className="sale-content-title">{item.name}</p>
                                <p>{item.address || "정보 없음"}</p>
                                <p>{item.startTime} ~ {item.endTime}</p>
                                <h4>
                                    <span>50%</span> 50,000원
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