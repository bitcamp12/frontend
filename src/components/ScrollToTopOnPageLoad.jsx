import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTopOnPageLoad = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [pathname]);

    useEffect(() => {
        window.history.scrollRestoration = "manual";
    }, []);

    return null;
};

export default ScrollToTopOnPageLoad;