import React from 'react';

const QA = () => {
    return (
        <div>
                <div>
                  <table style={{ width: '100%' }}>
                    <tr>
                      <td colSpan="2">
                        <div className="form-container">
                          <div className="input-container" style={{ marginBottom: '10px' }}>
                            <input
                              type="text"
                              id="inquiry-field"
                              name="inquiry-content"
                              placeholder="문의 내용을 입력하세요"
                              className="input-field"
                            />
                          </div>
              
                          <div style={{ textAlign: 'right' }}>
                            <input
                              type="button"
                              value="문의하기"
                              id="submit-btn"
                              className="submit-btn"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
              
                    <tr>
                      <td>
                      <div id="review-info">
                                <h1 id="user-info">아이디 | 기간</h1>
                                <h2 id="expectation-content">내용</h2>
                              </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
    );
};

export default QA;