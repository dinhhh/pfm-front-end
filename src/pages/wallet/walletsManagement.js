import { useEffect } from "react";
import { successToast, warningToast } from "../../common/toast";
import { API_PATH } from "../../config/api";
import { getApi, getApiAuth, postApiAuth } from "../../common/apiCaller";
import Modal from '../../components/modal';
import { useState } from 'react';
import React from 'react';
import { convertToVNDFormat } from "../../common/stringFormat";
import { AddButton } from "../../components/button";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

const WalletGeneralElement = ({ content }) => {
  const [isShowHistory, setShowHistory] = useState(false);

  return (
    <div className="col" onClick={() => setShowHistory( !isShowHistory )}>
      <div className="row">
        <div className="col-4">{content["name"]}</div>
        <div className="col-4">{convertToVNDFormat(content["balance"])}</div>
        <div className="col-4">
          <div className="row">
            <div className="col-6">
              {content["description"]}
            </div>
            <div className="col-6">
              <i className={isShowHistory ? "fas fa-angle-down" : "fas fa-angle-left"} />
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* hiển thị record trong content["history"] */}
    </div>
  );
}

const NewWalletForm = () => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const save = async () => {
    if (name === "") {
      warningToast("Tên ví không được để trống");
    }

    const requestBody = {
      "amount": amount,
      "name": name,
      "description": description
    };

    const response = await postApiAuth(API_PATH.NEW_WALLET, requestBody);
    if (response.ok) {
      successToast();
    } else {
      warningToast();
    }
  }

  return (
    <div>
      <div className='form-group'>
        <label>Số dư ban đầu</label>
        <input type="amount" className="form-control" id="amount" placeholder="Số tiền" onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div className='form-group'>
        <label>Tên tài khoản</label>
        <input type="name" className="form-control" id="name" placeholder="Tên tài khoản" onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className='form-group'>
        <label>Mô tả</label>
        <input type="description" className="form-control" id="description" placeholder="Mô tả" onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary" onClick={save}>Lưu</button>
    </div>
  );
}

const WalletsManagement = () => {
  const [isNewWalletFormOpen, setNewWalletFormOpen] = useState(false);
  const newWalletForm = <NewWalletForm />;
  const [loading, setLoading] = useState(true);
  const [currentWalletBalance, setCurrentWalletBalance] = useState(0);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const walletResponse = await getApiAuth(API_PATH.GET_ALL_WALLETS);
      if (walletResponse.ok) {
        const walletJson = await walletResponse.json()
        setCurrentWalletBalance(walletJson["balance"]);
        setWallets(walletJson["wallets"]);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="content-wrapper">
        {isNewWalletFormOpen && <Modal contentElement={newWalletForm} setOpenModal={setNewWalletFormOpen}></Modal>}
        <section className="content-header">
          <div className="content-fluid">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5>Tài khoản <AddButton onClickFunc={() => setNewWalletFormOpen(true)} /></h5>
                  <p>Tổng tiền hiện tại: {currentWalletBalance}</p>
                  <div className="row">
                    <div className="col-4">Tên</div>
                    <div className="col-4">Số dư hiện tại</div>
                    <div className="col-4">Mô tả</div>
                    <hr />
                  </div>
                  {wallets.length == 0 ? <div>Không có dữ liệu</div> : wallets.map((object, index) => <WalletGeneralElement content={object} />)}
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5>Sổ tiết kiệm</h5>
                  <p>Tổng tiền hiện tại: TODO</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5>Tích lũy</h5>
                  <p>Tổng tiền hiện tại: TODO</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

export default WalletsManagement;