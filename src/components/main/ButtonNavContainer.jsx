import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../assets/css/Main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ButtonNavContainer = ({ setSelectedTab }) => {
  const handleScroll = () => {
    const target = document.getElementById("bar-nav-container");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="button-nav-container">
      <button
        type="button"
        className="btn btn-secondary btn-lg custom-btn"
        onClick={() => {
          setSelectedTab(0);
          handleScroll();
        }}
      >
        연극 전체보기
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-lg custom-btn"
        onClick={() => {
          setSelectedTab(1);
          handleScroll();
        }}
      >
        ⏰ 곧 마감
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-lg custom-btn"
        onClick={() => {
          setSelectedTab(2);
          handleScroll();
        }}
      >
        🗓️ 상영예정
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-lg custom-btn"
        onClick={() => {
          setSelectedTab(3);
          handleScroll();
        }}
      >
        ⭐️ 프리미엄
      </button>
    </div>
  );
};

export default ButtonNavContainer;