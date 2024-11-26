import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/Main.css";

import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";

const InfiniteScrollContainer = () => {

    //10개의 item을 가진 배열을 만듬
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    //useRef로 target을 만들어서 새로운 item을 로딩할 때 사용
    const target = useRef(null);
    const navigate = useNavigate();

    const fetchData = async (pageNumber) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/plays/getPlayAll?page=${pageNumber}&size=50`, {withCredentials: true});
            const data = response.data;
            if (data && data.data && data.data.length >0) {
                setItems((prevItems) => [...prevItems, ...data.data]);
            } else {
                setHasMore(false);
            };
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData(page);
        console.log(items); // Check what data is coming through
    }, []);

    useEffect(() => {
        //뷰포트를 기준으로 target이 보이면 loadMoreItems 함수를 실행
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        //IntersectionObserver의 콜백함수 -> target이 보이면 loadMoreItems 함수를 실행
        const callback = (entries) => {
            if (entries[0].isIntersecting && hasMore) {
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
    }, [hasMore]);

    //10개의 item을 추가하는 함수 -> 전체가 50개가 넘어가면 더 이상 로딩하지 않음
    const loadMoreItems = () => {
        fetchData(page);
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        fetchData(page);
    }, []);

    //유져가 스크롤을 내리다가 처음에 로딩된 10개의 item을 다 보면 target이 보이게 됨
    //target이 보이면 loadMoreItems 함수를 실행해서 10개의 item을 추가함

    return (
        <div>
            <div className="infinite-scroll-container" id="infinite-scroll-container">
                {items.map((item, index) => (
                    <div className="infinite-scroll-card" key={index}>
                        <Link to={`/playDetail/${item.playSeq}`}>
                            <img src={`https://kr.object.ncloudstorage.com/bitcamp-9th-bucket-135/storage/${item.imageFileName}`} alt="Play Image" />
                        </Link>                        
                        <div className="infinite-scroll-card-body">
                            <h3>{item.name}</h3>
                            <h6 className="infinite-scroll-card-info">장소 : {item.address || "정보 없음"}</h6>
                            <h6 className="infinite-scroll-card-info">시간 : {item.startTime || "정보 없음"}</h6>
                        </div>
                    </div>
                ))}
            </div>
            {/* {hasMore && <div ref={target}></div>} */}
            {items.length < 50 && (
                <div ref={target}/>
            )}
        </div>
    );
};

export default InfiniteScrollContainer;