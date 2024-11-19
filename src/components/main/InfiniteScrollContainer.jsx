import "../../assets/css/Main.css";

import React, { useEffect, useRef, useState } from 'react';

const InfiniteScrollContainer = () => {
    //10개의 item을 가진 배열을 만듬
    const [items, setItems] = useState(Array.from({ length: 10 }));
    //useRef로 target을 만들어서 새로운 item을 로딩할 때 사용
    const target = useRef(null);

    useEffect(() => {
        //뷰포트를 기준으로 target이 보이면 loadMoreItems 함수를 실행
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        //IntersectionObserver의 콜백함수 -> target이 보이면 loadMoreItems 함수를 실행
        const callback = (entries) => {
            if (entries[0].isIntersecting) {
                loadMoreItems();
            }
        };

        //IntersectionObserver를 생성하고 target을 관찰
        const observer = new IntersectionObserver(callback, options);
        if (target.current) {
            observer.observe(target.current);
        }

        //컴포넌트가 언마운트 될 때 observer를 해제
        return () => {
            if (target.current) {
                observer.unobserve(target.current);
            }
        };
    }, []);

    //10개의 item을 추가하는 함수 -> 전체가 50개가 넘어가면 더 이상 로딩하지 않음
    const loadMoreItems = () => {
        setItems((prevItems) => {
            if (prevItems.length >= 50) {
                return prevItems;
            }
            return [
                ...prevItems,
                ...Array.from({ length: 10 }),
            ];
        });
    };

    //유져가 스크롤을 내리다가 처음에 로딩된 10개의 item을 다 보면 target이 보이게 됨
    //target이 보이면 loadMoreItems 함수를 실행해서 10개의 item을 추가함

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