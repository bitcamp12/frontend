const QA = ({
  isReplyVisible,
  replyDTO,
  handleReplayClick,
  setQATitle,
  QATitle,
  QACount,
  handleQAEditClick,
  QAText,
  setQAText,
  handleQASubmit,
  QAData,
  formatDate,
  handleQADeleteClick,
  handleQAClick,
  isQAUpdate,
  setIsQAUpdate,
  selectQASeq,
  userId, // 추가된 부분: 로그인된 사용자의 아이디
  
}) => {
  console.log(selectQASeq);
  console.log(replyDTO)

  return (
    <div className="qa-container" style={{ width: '100%' }}>
      {/* Inquiry Form */}
      <div className="form-container" style={{ marginBottom: '20px' }}>
        <div className="info-section-board">
          <div className="info-section-board-header">
            <strong>꼭 읽어주세요</strong>
          </div>
          <div className="info-section-board-content">
            <p>
              게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.<br />
              특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며 전화번호, 이메일 등의 개인정보는 악용될 우려가 있으므로 게시를 삼가 주시기 바랍니다.<br />
              사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 30 티켓 게시판 작성 권한이 제한됩니다.
            </p>
          </div>
        </div>
        <div className="input-container" style={{ marginBottom: '10px' }}>
          <input
            type="text"
            id="inquiry-field-title"
            name="inquiry-title"
            placeholder="제목을 입력하세요"
            className="input-field"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
            value={QATitle}
            onChange={(e) => setQATitle(e.target.value)}
          />

          <input
            type="text"
            id="inquiry-field"
            name="inquiry-content"
            placeholder="문의 내용을 입력하세요"
            className="input-field"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
            value={QAText}
            onChange={(e) => setQAText(e.target.value)}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <input
            type="button"
            value="문의하기"
            id="submit-btn"
            className="submit-btn"
            style={{
              padding: '10px 20px',
              backgroundColor: '#8E43E7',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => { handleQASubmit() }}
          />
        </div>
      </div>

      <div className="review-list-head">
        <div className="left-side">
          <strong className="review-total">총 <span className="num">{QACount}</span>개의 QA가 등록되었습니다.</strong>
        </div>
        <div className="right-side">
          <div className="review-search">
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="qa-review" style={{ marginTop: '20px' }}>
        {QAData && QAData.length > 0 ? (
          QAData.map((qa, index) => (
            <div key={index} className="qa-item" style={{ marginTop: '20px' }}>
              <div id="review-info" style={{ marginBottom: '10px' }}>
                <h1 id="user-info" style={{
                  fontSize: '16px',
                  margin: '0 0 5px',
                  color: '#333',
                }}> 작성자&nbsp;:&nbsp;&nbsp;{qa.name} | 작성 일자&nbsp;:&nbsp;&nbsp;{formatDate(qa.createdDate)}  </h1>
                <br/>
                <span >제목&nbsp;:&nbsp;&nbsp;{qa.title}</span>
                <br/>
                <br/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2
                  id="expectation-content"
                  style={{
                    fontSize: '20px',
                    margin: '0',
                    color: '#555',
                  }}
                >
                 문의 내용&nbsp;:&nbsp;&nbsp;{qa.content}
                </h2>
                <span
            data-qna-seq={qa.qnaSeq}
            onClick={() => handleReplayClick(qa.qnaSeq)}
            style={{ cursor: 'pointer', fontSize: '14px', color: '#8E43E7' }}
          >
            답변 열기
            <span className={`arrow-icon ${isReplyVisible[qa.qnaSeq] ? 'up' : ''}`}>
            🔽
            </span>
          </span>
                
                </div>
                <br/>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    {/* 수정/삭제 버튼 보이기 조건 추가 */}
                    {qa.id === userId && (
                      <div > 
                        <button
                          style={{
                            marginLeft: '10px',
                            width: '100px',
                            height: '30px',
                            backgroundColor: '#8E43E7',
                            borderRadius: '5px',
                            color: 'white',
                          }}
                          data-qa-seq={qa.qnaSeq}
                          onClick={() => handleQAEditClick(qa.qnaSeq)}
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
                          onClick={() => handleQADeleteClick(qa.qnaSeq)}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                 

                </div>
                {/* 댓글 목록 */}
                {/* 댓글 표시 */}
        {/* {isReplyVisible[qa.qnaSeq] && ( */}
         
         <br/>
         <div
         className={`reply-container ${isReplyVisible[qa.qnaSeq] ? 'visible' : ''}`}
         style={{
           marginTop: '10px',
           paddingLeft: '20px',
           borderLeft: '2px solid #ddd',
         }}
       >
         {replyDTO[qa.qnaSeq] ? (
           <p>관리자&nbsp;:&nbsp;{replyDTO[qa.qnaSeq].content}</p>
         ) : (
           <p>문의 답변이 아직 등록되지 않았습니다.</p>
         )}
       </div>
        {/* ) */}
        {/* } */}
              </div>
               
            </div>
          ))
          
        ) : (
          <p>Q&A가 없습니다.</p>
        )}
      </div>

      {isQAUpdate && (
        <div id="qa-modal" className="modal">
          <div id="qa-modal-content" className="modal-content">
            {/* 모달 닫기 버튼 */}
            <span className="close" onClick={() => setIsQAUpdate(false)}>
              &times;
            </span>

            {/* 입력 필드 */}
            <div className="input-container" style={{ marginBottom: '10px' }}>
            <input
            type="text"
            id="inquiry-field-title"
            name="inquiry-title"
            placeholder="제목을 입력하세요"
            className="input-field"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
            value={QATitle}
            onChange={(e) => setQATitle(e.target.value)}
          />
              
              <input
                type="text"
                id="qa-field"
                name="qa-content"
                placeholder="Q&A 내용을 입력하세요"
                className="review-input"
                value={QAText}
                onChange={(e) => setQAText(e.target.value)} // 상태 업데이트
              />
            </div>

            {/* 수정 버튼 */}
            <div style={{ textAlign: 'right' }}>
              <input
                type="submit"
                value="수정하기"
                id="submit-btn"
                className="submit-btn"
                data-qa-seq={selectQASeq || ""}
                onClick={handleQAClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QA;
