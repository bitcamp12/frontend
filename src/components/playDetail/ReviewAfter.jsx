import React from 'react';

const ReviewAfter = ({ratinghandleClick,rating}) => {
    return (
            <table id="review-form" style={{width:'100%'}}>
  <tbody>
    <tr>
      <from id="review-form"  >
      <div id="review-container">

        <div className="rating-container" style={{ textAlign: 'left', margin:'10px 20px' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className="star"
              style={{
                cursor: 'pointer',
                color: value <= rating ? 'gold' : 'gray', // 선택된 별은 금색, 나머지는 회색
                fontSize: '40px',
              }}
              onClick={() => ratinghandleClick(value)} // 별점 클릭 시 handleClick 호출
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
      </from>
    </tr>
    
    <tr>
      <td id="review-details">
        <div id="review-info">
          <h1 id="user-info">아이디 | 기간 | 별점</h1>
          <h2 id="review-content">내용</h2>
        </div>
      </td>
    </tr>
  </tbody>
</table>
    );
};

export default ReviewAfter;