import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/Main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BarNavContainer = () => {
  return (
    <div class="bar-nav-container" id="bar-nav-container">
      <ul class="nav nav-underline">
        <li class="nav-item">
          <a class="nav-link" href="#">
            연극 전체보기
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            선착순 최저가
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            요즘 HOT
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            리미티드
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BarNavContainer;