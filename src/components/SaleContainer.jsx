import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/Main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SaleContainer = () => {
    return (
        <div class="sale-container">
            <div class="sale-header">
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
                <div class="sale-wrapper">
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/21/21013249_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">2호선 세입자</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/24/24012027_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">나와 할아버지</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/22/22001159_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">늘근도둑 이야기</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/21/21013096_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">옥탑방 고양이</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/24/24013460_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">레미제라블</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/L0/L0000104_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">타인의 삶</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/24/24000171_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">연극 라멘</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/24/24014092_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">테베랜드</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/24/24014562_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">로켓캔디</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/23/23005252_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">카지노</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/23/23005704_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">행오버</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card">
                            <img src="https://ticketimage.interpark.com/Play/image/large/P0/P0004037_p.gif" />
                        </div>
                        <div class="sale-content">
                            <p class="sale-content-title">더 파더</p>
                            <p>장소</p>
                            <p>날짜</p>
                            <h4>
                                <span>50%</span> 50,000원
                            </h4>
                        </div>
                    </SwiperSlide>
                </div>
            </Swiper>
        </div>
    );
};

export default SaleContainer;