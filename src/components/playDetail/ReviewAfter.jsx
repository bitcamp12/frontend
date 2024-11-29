import axios from 'axios';
import React, { useState } from 'react';
const ReviewAfter = ({totalPages,userId,shearchBtn,searchKey,setShearchKey,searchType,setSearchType,reviewACount,handleDeleteClick,handleUpdateClick,selectedReviewSeq,handleEditClick,isReviewUpdate,setIsReviewUpdate,formatDate, reviewData,ratinghandleClick, rating ,handleSubmit,reviewText,setReviewText}) => {
 



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
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)} // 상태 업데이트
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <input
            type="submit"
            value="등록하기"
            id="submit-btn"
            className="submit-btn"
            onClick={handleSubmit} // 클릭 이벤트 핸들러
          />
        </div>
      </div>
      
      <div className="review-list-head">
          <div className='left-side'>
            <strong className="review-total">총 <span className='num'>{reviewACount}</span>개의 관람평이 등록되었습니다.</strong>
          </div>
          <div className='right-side'>
            <div className="review-search">
              <form className="review-search-form">
                <div className="review-combo-box">
                  <select className="review-combo-box-select"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}>
                    <option value="title">제목</option>
                    <option value="id">아이디</option>
                  </select>
                </div>
                <div className='review-search-box'>
                  <input type="text" className="review-search-input" value={searchKey} onChange={(e)=>setShearchKey(e.target.value)} placeholder="검색어를 입력하세요." />
                  <button type='button' className="review-search-btn" onClick={shearchBtn}>검색</button>
                </div>
              </form>
            </div>
          </div>
      </div>
      
      <hr style={{ marginTop: '20px', marginBottom: '30px' }} />
      <div id="review-details" style={{ marginTop: '20px' }}>
      {reviewData && reviewData.length > 0 ? (
      reviewData.map((review, index) => (
        <div key={index} className="review-item" style={{ marginTop: '20px' }}>
          <div id="review-info">
            <h1 id="user-info">
              {review.id} | {formatDate(review.createdDate)} | 별점: {review.rating}
            </h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 id="review-content">{review.content}</h2>

              {/* 아이디 같으면 보이도록 */}
              {review.id === userId && (
                    <div>
                      <button
                        style={{
                          marginLeft: '10px',
                          width: '100px',
                          height: '30px',
                          backgroundColor: '#8E43E7',
                          borderRadius: '5px',
                          color: 'white',
                        }}
                        data-review-seq={review.reviewAfterSeq}
                        onClick={() => handleEditClick(review.reviewAfterSeq)}
                      >
                        수정
                      </button>
                      <button
                        style={{
                          marginLeft: '10px',
                          width: '100px',
                          height: '30px',
                          backgroundColor: '#8E43E7',
                          borderRadius: '5px',
                          color: 'white',
                        }}
                        onClick={() => handleDeleteClick(review.reviewAfterSeq)}
                      >
                        삭제
                      </button>
                    </div>
                  )}
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>리뷰가 없습니다.</p>
    )}
 
    
   
{isReviewUpdate&&(
 <div id="review-modal" className="modal">
 <div id="review-modal-content" className="modal-content">
 <span className="close" onClick={() => setIsReviewUpdate(false)}>&times;</span>
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
              onClick={() => (ratinghandleClick(value),console.log(totalPages))} // Call handleClick when a star is clicked
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
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)} // 상태 업데이트
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <input
            type="submit"
            value="수정하기"
            id="submit-btn"
            className="submit-btn"
            data-review-seq={selectedReviewSeq}
            onClick={handleUpdateClick}
          />
        </div>
      </div>
  
  </div>
)}
      </div>
    </div>
  );
};

export default ReviewAfter;