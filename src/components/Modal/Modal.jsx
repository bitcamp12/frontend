import React from 'react';



const Modal = ({closeModal,modalMessage,modalTitle,alertVisible}) => {
    return (
        <div>
             {alertVisible && (
  <div id="alert-modal" className="modal">
    <div id="alert-modal-content" className="modal-content" >
      <table id='alert-table' style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ border: 'none' }}>
              <h3>{modalTitle}</h3>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' ,border: 'none'}}>
              <p>{modalMessage}</p>
            </td>
          </tr>
          <tr>
            <td style={{ border: 'none' }}>
              <button
                style={{
                  backgroundColor: '#8E43E7',
                  color: 'white',
                  border: 'none',
                  width: '100px',
                  borderRadius: '5px',
                  marginLeft: '350px',
                  height: '50px',
                }}
                onClick={closeModal}
              >
                확인
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}
        </div>
    );
};

export default Modal;