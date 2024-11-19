import React, { useEffect, useState } from 'react';
import '../../assets/css/Buttons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        isVisible && (
            <button class="bi bi-arrow-up-circle-fill ScrollToTopBtn" onClick={scrollToTop} />
        )
    );
};

export default ScrollToTop;