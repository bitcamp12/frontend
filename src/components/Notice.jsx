import React, { useEffect, useState } from 'react';
import MainNa from './MainNa';
import Footer from './Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../assets/css/Notice.css';
import axios from 'axios';

const Notice = () => {

    const [notice, setNotice] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/notices/getNoticeAll`, { withCredentials: true });
                setNotice(response.data.data);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };
        fetchNotices();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    return (
        <>
            <MainNa />
            <div className='noticeContainer'>
                <div className='noticeWrapper'>
                    <div className='noticeHeader'>
                        <h2>공지사항</h2>
                    </div>
                    <div className='noticeContentWrapper'>
                        <div class="accordion" id="accordionPanelsStayOpenExample">
                            {notice.map((item, index) => (
                                <div class="accordion-item" key={index}>
                                    <h2 class="accordion-header">
                                        <button
                                            class="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#panelsStayOpen-collapse${index}`}
                                            aria-expanded="false"
                                            aria-controls={`panelsStayOpen-collapse${index}`}>

                                            <div className="notice-text">
                                                <span className="noticeTitle">{item.title}</span>
                                                <span className="noticeDate">{formatDate(item.createdDate)}</span>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id={`panelsStayOpen-collapse${index}`} class="accordion-collapse collapse">
                                        <div class="accordion-body">
                                            {item.imageFileName &&
                                                 <img src={`https://kr.object.ncloudstorage.com/bitcamp-9th-bucket-135/storage/${item.imageFileName}`} alt={item.imageOriginalFileName} />
                                            }
                                            <p className='noticeContent' style={{whiteSpace: 'pre-wrap'}} >{item.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Notice;