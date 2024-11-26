import React from 'react';

const ReviewBefore = ({setShearchKey,shearchBBtn,searchKey,setSearchType,searchType,reviewBCount,selectedReviewSeqB,handleDeleteClickB,handleUpdateBClick,handleEditBClick,setIsReviewUpdate,isReviewUpdateB,setIsReviewUpdateB,handleSubmitB,reviewDataB,setReviewTextB,reviewTextB}) => {
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
                        value={reviewTextB}
                        onChange={(e) => setReviewTextB(e.target.value)}
                    />
                </div>

                <div style={{ textAlign: 'right' }}>
                    <input
                        type="button"
                        value="등록하기"
                        id="submit-btn"
                        className="submit-btn"
                        onClick={()=>{handleSubmitB()}}
                    />
                </div>
            </div>

            <div className="review-list-head">
                <div className='left-side'>
                    <strong className="review-total">총 <span className='num'>{reviewBCount}</span>개의 관람평이 등록되었습니다.</strong>
                </div>
                <div className='right-side'>
                    <div className="review-search">
                        <form className="review-search-form">
                            <div className="review-combo-box">
                                <select className="review-combo-box-select"
                                 value={searchType}
                                 onChange={(e) => setSearchType(e.target.value)}>
                                    <option value="title">글제목</option>
                                    <option value="id">아이디</option>
                                </select>
                            </div>
                            <div className='review-search-box'>
                                <input type="text" className="review-search-input" value={searchKey} onChange={(e)=>setShearchKey(e.target.value)} placeholder="검색어를 입력하세요." />
                                <button type='button' className="review-search-btn" onClick={shearchBBtn}>검색</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="review-details" style={{ marginTop: '20px' }}>
                {reviewDataB && reviewDataB.length > 0 ? (
                reviewDataB.map((review, index) => (
                    <div key={index} className="review-item" style={{ marginTop: '20px' }}>
                    <div id="review-info">
                        <h1 id="user-info">
                        
            </h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 id="review-content">{review.content}</h2>

              {/* 아이디 같으면 보이도록 */}
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
                  data-review-seq={review.reviewBeforeSeq}
                 onClick={()=>{handleEditBClick(review.reviewBeforeSeq)}}
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
                  onClick={() => handleDeleteClickB(review.reviewBeforeSeq)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>리뷰가 없습니다.</p>
    )}


            </div>


            {isReviewUpdateB&&(
 <div id="review-modal" className="modal">
 <div id="review-modal-content" className="modal-content">
 <span className="close" onClick={() => setIsReviewUpdateB(false)}>&times;</span>
 

        <div className="input-container" style={{ marginBottom: '10px' }}>
          <input
            type="text"
            id="rating-field"
            name="review-content"
            placeholder="리뷰를 입력하세요"
            className="review-input"
            value={reviewTextB}
            onChange={(e) => setReviewTextB(e.target.value)} // 상태 업데이트
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <input
            type="submit"
            value="수정하기"
            id="submit-btn"
            className="submit-btn"
            data-review-seq={selectedReviewSeqB}
            onClick={handleUpdateBClick}
           
          />
        </div>
      </div>
  
  </div>
)}
        </div>
    );
};

export default ReviewBefore;