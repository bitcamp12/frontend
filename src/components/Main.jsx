import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/Main.css";
import React from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import AdvertiseContainer from "./AdvertiseContainer";
import ButtonNavContainer from "./ButtonNavContainer";
import SaleContainer from "./SaleContainer";
import BarNavContainer from "./BarNavContainer";
import InfiniteScrollContainer from "./InfiniteScrollContainer";

const Main = () => {
  return (
    <div>
      <AdvertiseContainer />
      <ButtonNavContainer />
      <SaleContainer />
      <BarNavContainer />
      <ButtonNavContainer />
      <InfiniteScrollContainer />
    </div>
  );
};

export default Main;
