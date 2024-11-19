import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../assets/css/Main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HashLink } from 'react-router-hash-link';

const BarNavContainer = () => {
  return (
    <div class="bar-nav-container" id="bar-nav-container">
      <ul class="nav nav-underline">
        <li class="nav-item">
          <HashLink to="#bar-nav-container" class="nav-link">연극 전체보기</HashLink>
        </li>
        <li class="nav-item">
          <HashLink to="#bar-nav-container" class="nav-link">선착순 최저가</HashLink>
        </li>
        <li class="nav-item">
          <HashLink to="#bar-nav-container" class="nav-link">요즘 HOT</HashLink>
        </li>
        <li class="nav-item">
          <HashLink to="#bar-nav-container" class="nav-link">리미티드</HashLink>
        </li>
      </ul>
    </div>
  );
};

export default BarNavContainer;