import React from 'react';

const ReviewBefore = () => {
    return (
        
        <table id="expectation-form" style={{width:'100%'}}>
        <tbody>
          <tr>
            <td>
      
              <div className="input-container" style={{ marginBottom: '10px' }}>
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
      
            </td>
          </tr>
      
          <tr>
            <td id="review-details">
              <div id="review-info">
                <h1 id="user-info">아이디 | 기간</h1>
                <h2 id="expectation-content">내용</h2>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
};

export default ReviewBefore;