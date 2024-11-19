import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/Main.css";
import "../assets/css/Buttons.css"
import "../assets/css/MainNa.css";
import React from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import AdvertiseContainer from "./main/AdvertiseContainer";
import ButtonNavContainer from "./main/ButtonNavContainer";
import SaleContainer from "./main/SaleContainer";
import BarNavContainer from "./main/BarNavContainer";
import InfiniteScrollContainer from "./main/InfiniteScrollContainer";
import MainNa from "./MainNa";
import Footer from "./Footer";
import ScrollToTop from "./buttons/ScrollToTop";

const Main = () => {
  return (
    <>
      <MainNa />
      <ScrollToTop />
      <AdvertiseContainer />
      <ButtonNavContainer />
      <SaleContainer />
      <BarNavContainer />
      <InfiniteScrollContainer />
      <Footer />
    </>
  );
};

export default Main;
