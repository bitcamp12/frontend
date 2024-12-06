import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../assets/css/Main.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HashLink } from 'react-router-hash-link';

const BarNavContainer = ({selectedTab, setSelectedTab}) => {

  const navItems = [
    "연극 전체보기",
    "곧 마감",
    "요즘 HOT",
    "30티켓 베스트"
  ];

  return (
    <div className="bar-nav-container" id="bar-nav-container">
      <ul className="nav nav-underline">
        {navItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <HashLink to="#bar-nav-container" className={`nav-link ${selectedTab === index ? 'active' : ''}`} onClick={() => setSelectedTab(index)}>
              {item}
            </HashLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarNavContainer;