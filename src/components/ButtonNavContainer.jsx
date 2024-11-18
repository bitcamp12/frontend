import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/Main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HashLink } from 'react-router-hash-link';

const ButtonNavContainer = () => {
  return (
    <div class="button-nav-container">
      <HashLink to="#bar-nav-container">
        <button type="button" class="btn btn-secondary btn-lg custom-btn">
          연극 전체보기
        </button>
      </HashLink>
      <HashLink to="#bar-nav-container">
        <button type="button" class="btn btn-secondary btn-lg custom-btn">
          📉 선착순 최저가
        </button>
      </HashLink>
      <HashLink to="#bar-nav-container">
        <button type="button" class="btn btn-secondary btn-lg custom-btn">
          🔥 요즘 HOT
        </button>
      </HashLink>
      <HashLink to="#bar-nav-container">
        <button type="button" class="btn btn-secondary btn-lg custom-btn">
          ⏰ 리미티드
        </button>
      </HashLink>
    </div>
  );
};

export default ButtonNavContainer;