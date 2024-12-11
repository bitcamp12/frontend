import React from 'react';
import "../../assets/css/Book.css";

const Book = ({ closeModal }) => {
    return (
        <div id='book-modal' className='book-modal'>
            <div id='book-modal-content' className='book-modal-content'>
                <span className="book-close" onClick={closeModal}>&times;</span>
                <div className='book-modal-header'>
                    <div className='book-modal-header-text'>
                        <h2>STAGE</h2>
                    </div>
                </div>
                <div className='book-modal-body'>
                    <div className='book-modal-body-seats'>
                        <div className='book-modal-body-seats-content-row'>
                            <div className='book-modal-body-seats-content-row-seat'>1</div>
                            <div className='book-modal-body-seats-content-row-seat'>2</div>
                            <div className='book-modal-body-seats-content-row-seat'>3</div>
                            <div className='book-modal-body-seats-content-row-seat'>4</div>
                            <div className='book-modal-body-seats-content-row-seat'>5</div>
                        </div>
                        <div className='book-modal-body-seats-content-row'>
                            <div className='book-modal-body-seats-content-row-seat'>6</div>
                            <div className='book-modal-body-seats-content-row-seat'>7</div>
                            <div className='book-modal-body-seats-content-row-seat'>8</div>
                            <div className='book-modal-body-seats-content-row-seat'>9</div>
                            <div className='book-modal-body-seats-content-row-seat'>10</div>
                        </div>
                        <div className='book-modal-body-seats-content-row'>
                            <div className='book-modal-body-seats-content-row-seat'>11</div>
                            <div className='book-modal-body-seats-content-row-seat'>12</div>
                            <div className='book-modal-body-seats-content-row-seat'>13</div>
                            <div className='book-modal-body-seats-content-row-seat'>14</div>
                            <div className='book-modal-body-seats-content-row-seat'>15</div>
                        </div>
                        <div className='book-modal-body-seats-content-row'>
                            <div className='book-modal-body-seats-content-row-seat'>16</div>
                            <div className='book-modal-body-seats-content-row-seat'>17</div>
                            <div className='book-modal-body-seats-content-row-seat'>18</div>
                            <div className='book-modal-body-seats-content-row-seat'>19</div>
                            <div className='book-modal-body-seats-content-row-seat'>20</div>
                        </div>
                        <div className='book-modal-body-seats-content-row'>
                            <div className='book-modal-body-seats-content-row-seat'>21</div>
                            <div className='book-modal-body-seats-content-row-seat'>22</div>
                            <div className='book-modal-body-seats-content-row-seat'>23</div>
                            <div className='book-modal-body-seats-content-row-seat'>24</div>
                            <div className='book-modal-body-seats-content-row-seat'>25</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;