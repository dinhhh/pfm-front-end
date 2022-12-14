import React from "react";
import "./modal.css";

const Modal = ({ contentElement, setOpenModal }) => {
  return (
    <div className="content-header">
      <div className="content-fluid">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="titleCloseBtn">
                <button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  X
                </button>
              </div>
              {/* <div className="title">
                <h1>Are You Sure You Want to Continue?</h1>
              </div>
              <div className="body">
                <p>The next page looks amazing. Hope you want to go there!</p>
              </div> */}
              <div>
                {contentElement}
              </div>
              {/* <div className="footer">
                <button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  id="cancelBtn"
                >
                  Đóng
                </button>
                <button>Lưu</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;