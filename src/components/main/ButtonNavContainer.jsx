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
    <div className="button-nav-container">
      <HashLink to="#bar-nav-container">
        <button type="button" className="btn btn-secondary btn-lg custom-btn" onClick={() => setSelectedTab(0)}>
          연극 전체보기
        </button>
      </HashLink>
      <HashLink to="#bar-nav-container">
        <button type="button" className="btn btn-secondary btn-lg custom-btn" onClick={() => setSelectedTab(1)}>
         ⏰ 곧 마감
        </button>
      </HashLink>
      <HashLink to="#bar-nav-container">
        <button type="button" className="btn btn-secondary btn-lg custom-btn" onClick={() => setSelectedTab(2)}>
          🔥 요즘 HOT
        </button>
      </HashLink>
      <HashLink to="#bar-nav-container">
        <button type="button" className="btn btn-secondary btn-lg custom-btn" onClick={() => setSelectedTab(3)}>
          ⭐️ 30티켓 베스트
        </button>
      </HashLink>
    </div>
  );
};

export default ButtonNavContainer;