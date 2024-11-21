import React from 'react';

const ReviewBefore = () => {
    return (
        <div id="expectation-form" style={{ width: '100%' }}>
            <div id="expectation-container">
                <div className="input-container">
                    <input
                        type="text"
                        id="expectation-field"
                        name="expectation-content"
                        placeholder="리뷰를 입력하세요"
                        className="review-input"
                    />
                </div>

                <div style={{ textAlign: 'right' }}>
                    <input
                        type="button"
                        value="등록하기"
                        id="submit-btn"
                        className="submit-btn"
                    />
                </div>
            </div>

            <div className="review-list-head">
                <div className='left-side'>
                    <strong className="review-total">총 <span className='num'>0</span>개의 관람평이 등록되었습니다.</strong>
                </div>
                <div className='right-side'>
                    <div className="review-search">
                        <form className="review-search-form">
                            <div className="review-combo-box">
                                <select className="review-combo-box-select">
                                    <option value="title">글제목</option>
                                    <option value="id">아이디</option>
                                </select>
                            </div>
                            <div className='review-search-box'>
                                <input type="text" className="review-search-input" placeholder="검색어를 입력하세요." />
                                <button className="review-search-btn">검색</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="review-details" style={{ marginTop: '20px' }}>
                <div id="review-info">
                    <h1 id="user-info">아이디 | 기간 | 별점</h1>
                    <h2 id="expectation-content">내용</h2>
                </div>
            </div>
        </div>
    );
};

export default ReviewBefore;