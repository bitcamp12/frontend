import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/Main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AdvertiseContainer = () => {
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
          <SwiperSlide>
            <div class="card">
              <img src="https://ticketimage.interpark.com/Play/image/large/21/21013249_p.gif" />
              <div class="card-body">
                <h3>2호선 세입자</h3>
                <h6 class="card-info">장소</h6>
                <h6 class="card-info">시간</h6>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card">
              <img src="https://ticketimage.interpark.com/Play/image/large/24/24012027_p.gif" />
              <div class="card-body">
                <h3>나와 할아버지</h3>
                <h6 class="card-info">장소</h6>
                <h6 class="card-info">시간</h6>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card">
              <img src="https://ticketimage.interpark.com/Play/image/large/22/22001159_p.gif" />
              <div class="card-body">
                <h3>늘근도둑 이야기</h3>
                <h6 class="card-info">장소</h6>
                <h6 class="card-info">시간</h6>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card">
              <img src="https://ticketimage.interpark.com/Play/image/large/21/21013096_p.gif" />
              <div class="card-body">
                <h3>옥탑방 고양이</h3>
                <h6 class="card-info">장소</h6>
                <h6 class="card-info">시간</h6>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card">
              <img src="https://tickets.interpark.com/contents/_next/image?url=http%3A%2F%2Fticketimage.interpark.com%2FTCMS3.0%2FGMain%2FPlay%2F2409%2F240925043734_24013460.gif&w=640&q=75" />
              <div class="card-body">
                <h3>레미제라블</h3>
                <h6 class="card-info">장소</h6>
                <h6 class="card-info">시간</h6>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card">
              <img src="https://ticketimage.interpark.com/Play/image/large/L0/L0000104_p.gif" />
              <div class="card-body">
                <h3>타인의 삶</h3>
                <h6 class="card-info">장소</h6>
                <h6 class="card-info">시간</h6>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="card">
              <img src="https://ticketimage.interpark.com/Play/image/large/24/24000171_p.gif" />
              <div class="card-body">
                <h3>연극 라면</h3>
                <h6 class="card-info">장소</h6>
                <h6 class="card-info">시간</h6>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        </div>
    );
};

export default AdvertiseContainer;