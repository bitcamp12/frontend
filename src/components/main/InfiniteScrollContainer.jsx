import "../../assets/css/Main.css";

import React, { useEffect, useRef, useState } from 'react';

const InfiniteScrollContainer = () => {
    const [items, setItems] = useState(Array.from({ length: 6 }));
    const target = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const callback = (entries) => {
            if (entries[0].isIntersecting) {
                loadMoreItems();
            }
        };

        const observer = new IntersectionObserver(callback, options);
        if (target.current) {
            observer.observe(target.current);
        }

        return () => {
            if (target.current) {
                observer.unobserve(target.current);
            }
        };
    }, []);

    const loadMoreItems = () => {
        setItems((prevItems) => {
            if (prevItems.length >= 30) {
                return prevItems;
            }
            return [
                ...prevItems,
                ...Array.from({ length: 6 }),
            ];
        });
    };

    return (
        <div>
            <div className="infinite-scroll-container" id="infinite-scroll-container">
                {items.map((_, index) => (
                    <div className="infinite-scroll-card" key={index}>
                        <img src="https://ticketimage.interpark.com/Play/image/large/21/21013249_p.gif" />
                        <div className="infinite-scroll-card-body">
                            <h3>제목 {index + 1}</h3>
                            <h6 className="infinite-scroll-card-info">장소</h6>
                            <h6 className="infinite-scroll-card-info">시간</h6>
                        </div>
                    </div>
                ))}
            </div>
            {items.length < 100 && (
                <div ref={target}/>
            )}
        </div>
    );
};

export default InfiniteScrollContainer;