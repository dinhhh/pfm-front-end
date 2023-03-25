import { RequireStar } from "../../components/annotation";
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
      {
        isShowHistory &&
        content["history"].length != 0 &&
        content["history"].map(history => {
          return <div className="row" style={history["operationType"] == "EXPENSE" ? {color: "red"} : {color: "green"}}>
            <div className="col-4">{history["description"]}</div>
            <div className="col-4">{convertToVNDFormat(history["amount"])}</div>
            <hr />
          </div>
        })
      }
      <hr />
    </div>
  );
}

const SavingAccountGeneralElement = ({ content }) => {
  const [isShowHistory, setShowHistory] = useState(false);
  
  const convertToVNDateFormat = (date) => {
    const a = date.split("-");
    return a[2] + "-" + a[1] + "-" + a[0];
  }

  const getDiffDate = ( prevDate ) => {
    const now = new Date();
    const diff = now.getTime() - prevDate.getTime();
    return Math.floor(diff / (1000 * 3600 * 24));
  }

  const todayInterest = content["balance"] * content["dayInterestRate"] * getDiffDate(new Date(content["createdDate"])) / (365 * 100);
  const dueDateInterest = content["balance"] * (content["yearInterestRate"] / 12) * content["period"] / 100;

  return (
    <div className="col" onClick={() => setShowHistory( !isShowHistory )}>
      <div className="row">
        <div className="col-4">{content["name"]}</div>
        <div className="col-4">{convertToVNDFormat(content["balance"])}</div>
        <div className="col-4">
          <div className="row">
            <div className="col-6">
              {convertToVNDateFormat(content["dueDate"])}
            </div>
            <div className="col-6">
              <i className={isShowHistory ? "fas fa-angle-down" : "fas fa-angle-left"} />
            </div>
          </div>
        </div>
      </div>
      {isShowHistory && 
        <div className="col">
          <div style={{color: "red"}}>
            Tiền lãi khi rút ngay: {convertToVNDFormat(todayInterest)}
          </div>
          <div style={{color: "green"}}>
            Tiền lãi khi đáo hạn: {convertToVNDFormat(dueDateInterest)}
          </div>
        </div>
      }
      <hr />
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
      return;
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
        <label>Số dư ban đầu <RequireStar /></label>
        <input type="amount" className="form-control" id="amount" placeholder="Số tiền" onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div className='form-group'>
        <label>Tên tài khoản <RequireStar /></label>
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

const NewSavingAccountForm = () => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState(null);
  const [yearInterestRate, setYearInterestRate] = useState(null);
  const [dayInterestRate, setDayInterestRate] = useState(null);

  const save = async () => {
    if (name === "" || period == null || yearInterestRate == null || dayInterestRate == null) {
      warningToast("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const requestBody = {
      "amount": amount,
      "name": name,
      "description": description,
      "yearInterestRate": yearInterestRate,
      "dayInterestRate": dayInterestRate,
      "period": period
    };

    const response = await postApiAuth(API_PATH.NEW_SAVING_ACCOUNT, requestBody);
    if (response.ok) {
      successToast();
    } else {
      warningToast();
    }
  }

  return (
    <div>
      <div className='form-group'>
        <label>Số tiền gửi tiết kiệm <RequireStar /></label>
        <input type="amount" className="form-control" id="amount" placeholder="Số tiền" onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div className='form-group'>
        <label>Tên tài khoản <RequireStar /></label>
        <input type="name" className="form-control" id="name" placeholder="Tên tài khoản" onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className='form-group'>
        <label>Mô tả</label>
        <input type="description" className="form-control" id="description" placeholder="Mô tả" onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className='form-group'>
        <label>Kỳ hạn <RequireStar /></label>
        <select className="form-control mb-3" onChange={(e) => setPeriod(e.target.value)}>
          <option value={null}></option>
          <option value={1}>1 tháng</option>
          <option value={3}>3 tháng</option>
          <option value={6}>6 tháng</option>
          <option value={12}>12 tháng</option>
        </select>
      </div>
      <div className='form-group'>
        <label>Lãi suất theo năm (%) <RequireStar /></label>
        <input type="description" className="form-control" id="description" placeholder="Lãi suất theo tháng" onChange={(e) => setYearInterestRate(e.target.value)} />
      </div>
      <div className='form-group'>
        <label>Lãi suất theo ngày (%) <RequireStar /></label>
        <input type="description" className="form-control" id="description" placeholder="Lãi suất theo ngày" onChange={(e) => setDayInterestRate(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary" onClick={save}>Lưu</button>
    </div>
  );
}

const WalletsManagement = () => {
  const [isNewWalletFormOpen, setNewWalletFormOpen] = useState(false);
  const [isNewSavingAccountFormOpen, setNewSavingAccountFormOpen] = useState(false);
  const newWalletForm = <NewWalletForm />;
  const newSavingAccountForm = <NewSavingAccountForm />;
  const [loading, setLoading] = useState(true);
  const [currentWalletBalance, setCurrentWalletBalance] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [savingAccounts, setSavingAccounts] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const walletResponse = await getApiAuth(API_PATH.GET_ALL_WALLETS);
      if (walletResponse.ok) {
        const walletJson = await walletResponse.json()
        setCurrentWalletBalance(walletJson["balance"]);
        setWallets(walletJson["wallets"]);
        setSavingAccounts(walletJson["savingAccounts"])
        setLoading(false);
      }
    }

    fetchData();
  }, [isNewWalletFormOpen]);

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="content-wrapper">
        
        <section className="content-header">
          <div className="content-fluid">
            <div className="col">
              {isNewWalletFormOpen && <Modal contentElement={newWalletForm} setOpenModal={setNewWalletFormOpen}></Modal>}
              <div className="card">
                <div className="card-body">
                  <h5>Tài khoản thu chi <AddButton onClickFunc={() => setNewWalletFormOpen(true)} /></h5>
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
              {isNewSavingAccountFormOpen && <Modal contentElement={newSavingAccountForm} setOpenModal={setNewSavingAccountFormOpen}></Modal>}
              <div className="card">
                <div className="card-body">
                  <h5>Sổ tiết kiệm <AddButton onClickFunc={() => setNewSavingAccountFormOpen(true)} /></h5>
                  <p>Tổng tiền hiện tại: </p>
                  <div className="row">
                    <div className="col-4">Tên</div>
                    <div className="col-4">Tiền gửi ban đầu</div>
                    <div className="col-4">Ngày đáo hạn</div>
                    <hr />
                  </div>
                  {savingAccounts.length == 0 ? <div>Không có dữ liệu</div> :savingAccounts.map((object, index) => <SavingAccountGeneralElement content={object} />)}
                </div>
              </div>
              {/* <div className="card">
                <div className="card-body">
                  <h5>Tích lũy</h5>
                  <p>Tổng tiền hiện tại: TODO</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

export default WalletsManagement;