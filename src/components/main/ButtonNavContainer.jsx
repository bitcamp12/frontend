import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../assets/css/Main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HashLink } from 'react-router-hash-link';

const ButtonNavContainer = ({setSelectedTab}) => {
  return (
    <div class="button-nav-container">
      <HashLink to="#bar-nav-container">
        <button type="button" class="btn btn-secondary btn-lg custom-btn" onClick={() => setSelectedTab(0)}>
          연극 전체보기
        </button>
      </HashLink>
      <HashLink to="#bar-nav-container">
        <button type="button" class="btn btn-secondary btn-lg custom-btn" onClick={() => setSelectedTab(1)}>
          📉 선착순 최저가
        </button>
      </HashLink>
      <HashLink to="#bar-nav-container">
        <button type="button" class="btn btn-secondary btn-lg custom-btn" onClick={() => setSelectedTab(2)}>
          🔥 요즘 HOT
        </button>
      </HashLink>
      <HashLink to="#bar-nav-container">
        <button type="button" class="btn btn-secondary btn-lg custom-btn" onClick={() => setSelectedTab(3)}>
          ⏰ 리미티드
        </button>
      </HashLink>
    </div>
  );
};

export default ButtonNavContainer;