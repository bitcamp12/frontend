import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../assets/css/Main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdvertiseContainer = () => {

  const [plays, setPlays] = useState([]);

  useEffect(() => {
    const fetchRandomPlays = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/plays/getPlayRandom", { withCredentials: true });
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
    <div class="advertise-container">
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        loop={true}
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {plays.map((item, index) => (
          <SwiperSlide key={index}>
            <div class="card">
              <Link to={`/playDetail?=${item.playSeq}`}>
              <img
                src={`https://kr.object.ncloudstorage.com/bitcamp-9th-bucket-135/storage/${item.imageFileName}`}
                alt={item.name}
              />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdvertiseContainer;