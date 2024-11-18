import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/css/Main.css';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';

const Main = () => {
  return (
    <div>
        <div class="advertise-container">
            <Swiper
            slidesPerView={6}
            spaceBetween={40}
            loop={true}
            centeredSlides={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
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
                <img src="https://ticketimage.interpark.com/Play/image/large/24/24013460_p.gif" />
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
        <div class="button-nav-container">
        <button type="button" class="btn btn-secondary btn-lg custom-btn">연극 전체보기</button>
        <button type="button" class="btn btn-secondary btn-lg custom-btn">📉 선착순 최저가</button>
        <button type="button" class="btn btn-secondary btn-lg custom-btn">🔥 요즘 HOT</button>
        <button type="button" class="btn btn-secondary btn-lg custom-btn">⏰ 리미티드</button>
        </div>
        <div class="sale-container">
            <div class="sale-header">
                <h3>지금 할인 중!!</h3>
            </div>
            <Swiper
            slidesPerView={4}
            spaceBetween={80}
            slidesPerGroup={4}
            centeredSlides={false}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper2"
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
                <img src="https://ticketimage.interpark.com/Play/image/large/24/24013460_p.gif" />
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
            <SwiperSlide>
                <div class="card">
                <img src="https://ticketimage.interpark.com/Play/image/large/24/24014092_p.gif" />
                    <div class="card-body">
                        <h3>테베랜드</h3>
                        <h6 class="card-info">장소</h6>
                        <h6 class="card-info">시간</h6>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                <img src="https://ticketimage.interpark.com/Play/image/large/24/24014562_p.gif" />
                    <div class="card-body">
                        <h3>로켓 캔디</h3>
                        <h6 class="card-info">장소</h6>
                        <h6 class="card-info">시간</h6>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                <img src="https://ticketimage.interpark.com/Play/image/large/23/23005252_p.gif" />
                    <div class="card-body">
                        <h3>카지노</h3>
                        <h6 class="card-info">장소</h6>
                        <h6 class="card-info">시간</h6>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                <img src="https://ticketimage.interpark.com/Play/image/large/23/23005704_p.gif" />
                <div class="card-body">
                        <h3>행오버</h3>
                        <h6 class="card-info">장소</h6>
                        <h6 class="card-info">시간</h6>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="card">
                <img src="https://ticketimage.interpark.com/Play/image/large/P0/P0004037_p.gif" />
                <div class="card-body">
                        <h3>더 파더</h3>
                        <h6 class="card-info">장소</h6>
                        <h6 class="card-info">시간</h6>
                    </div>
                </div>
            </SwiperSlide>
            </Swiper>
        </div>
        <div class="bar-nav-container">
        <ul class="nav nav-underline">
            <li class="nav-item">
                <a class="nav-link" href="#">연극 전체보기</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">선착순 최저가</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">요즘 HOT</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">리미티드</a>
            </li>
        </ul>
        </div>
    </div>
  );
};

export default Main;