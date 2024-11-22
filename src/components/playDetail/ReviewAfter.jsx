import React from 'react';

const ReviewAfter = ({ ratinghandleClick, rating }) => {
  return (
    <div id="review-form" style={{ width: '100%' }}>
      <div id="review-container">
        <div className="rating-container" style={{ textAlign: 'left', marginTop: '20px', marginBottom: '20px' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className="star"
              style={{
                cursor: 'pointer',
                color: value <= rating ? 'gold' : 'gray', // Selected stars are gold, others are gray
                fontSize: '40px',
              }}
              onClick={() => ratinghandleClick(value)} // Call handleClick when a star is clicked
            >
              ★
            </span>
          ))}
        </div>

        <div className="input-container" style={{ marginBottom: '10px' }}>
          <input
            type="text"
            id="rating-field"
            name="review-content"
            placeholder="리뷰를 입력하세요"
            className="review-input"
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <input
            type="submit"
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
      
      <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
      <div id="review-details" style={{ marginTop: '20px' }}>
        <div id="review-info">
          <h1 id="user-info">아이디 | 기간 | 별점</h1>
          <h2 id="review-content">내용</h2>
        </div>
      </div>
    </div>
  );
};

export default ReviewAfter;