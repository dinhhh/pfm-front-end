import { RequireStar } from "../../components/annotation";
import { buildCategory, convertDateToString } from "../../common/utils";
import { getApiAuth, postApiAuth } from "../../common/apiCaller";
import { useEffect } from "react";
import React, { useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import DateTimePicker from "react-datetime-picker";
import { API_PATH } from "../../config/api";
import { OPERATION_TYPE_CODE } from "../../config/constant";
import { successToast, warningToast } from "../../common/toast";
import { AddButton } from "../../components/button";

const NewExpenseIncomeForm = ({ wallets, categories, setWalletNo, setCategoryNo }) => {

  var options = buildCategory(categories);

  return (
    <div>
      <div className="form-group">
        <label>Chọn hạng mục <RequireStar /></label>
        <select class="form-control mb-3" onChange={(e) => setCategoryNo(e.target.value)}>
          <option value={null} selected={true}></option>
          {
            options.length !== 0 && options.map((object, index) => <option value={object["categoryNo"]}>{object["categoryName"]}</option>)
          }
        </select>
      </div>

      <div className="form-group">
        <label>Tài khoản <RequireStar /></label>
        <select class="form-control mb-3" onChange={(e) => setWalletNo(e.target.value)}>
          <option value={null} selected={true}></option>
          {
            wallets.length !== 0 && wallets.map((object, index) => <option value={object["walletNo"]}>{object["name"]}</option>)
          }
        </select>
      </div>
    </div>
  );
}

const NewDebtForm = ({ label, currentUserDebtInfo, setUserDebtInfoNo, setUserDebtInfoName, setExpectCollectDate, newUserDebt, setNewUserDebt }) => {
  const now = new Date();
  return (
    <div>
      <div className="form-group">
        <label>{label} <RequireStar /><AddButton onClickFunc={() => setNewUserDebt(!newUserDebt)} /></label>
        <>
          {newUserDebt ?
            <input type="text" className="form-control" id="amount" placeholder={label} onChange={(e) => setUserDebtInfoName(e.target.value)} /> :
            <select className="form-control mb-3" onChange={(e) => setUserDebtInfoNo(e.target.value)}>
              <option value={null}></option>
              {currentUserDebtInfo != null && currentUserDebtInfo.length !== 0 &&
                currentUserDebtInfo.map((object, index) => <option value={object["userDebtInfoNo"]}>{object["name"]}</option>)}
            </select>}
        </>
      </div>
      <div className="form-group">
        <label>Thời gian hoàn trả dự kiến</label>
        <DateTimePicker format="dd-MM-y" onChange={setExpectCollectDate} value={now} className="ml-3" />
      </div>
    </div>
  );
}

const AddRecordForm = ({ wallets, expenseCategories, incomeCategories, currentUserDebtInfo }) => {

  const [selected, setSelected] = useState("expense");
  const [walletNo, setWalletNo] = useState("");
  const [categoryNo, setCategoryNo] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [newUserDebt, setNewUserDebt] = useState(false);
  const [userDebtInfoNo, setUserDebtInfoNo] = useState("");
  const [userDebtInfoName, setUserDebtInfoName] = useState("");
  const [expectCollectDate, setExpectCollectDate] = useState(new Date());

  const selectType = (e) => {
    setSelected(e.target.value);
  }

  const submit = async () => {
    var operationType = 0;
    switch (selected) {
      case "expense":
        operationType = OPERATION_TYPE_CODE.EXPENSE;
        break;
      case "income":
        operationType = OPERATION_TYPE_CODE.INCOME;
        break;
      case "lend":
        operationType = OPERATION_TYPE_CODE.LEND;
        break;
      case "borrow":
        operationType = OPERATION_TYPE_CODE.BORROW;
        break;
      default:
        break;
    }
    if (selected == "expense" || selected == "income") {
      const requestBody = {
        "createdOn": convertDateToString(date),
        "amount": parseInt(amount, 10),
        "description": description,
        "walletNo": walletNo,
        "categoryNo": categoryNo,
        "operationCode": operationType
      };

      const response = await postApiAuth(API_PATH.NEW_EXPENSE_INCOME, requestBody);
      if (response.ok) {
        successToast();
      } else {
        warningToast();
      }
    } else {
      const requestBody = {
        "createdOn": convertDateToString(date),
        "amount": parseInt(amount, 10),
        "description": description,
        "operationCode": operationType,
        "createdDate": convertDateToString(date),
        "expectCollectDate": convertDateToString(expectCollectDate),
        "userDebtInfoNo": userDebtInfoNo,
        "isNewUserDebtInfo": newUserDebt ? 1 : 0,
        "userDebtInfoName": userDebtInfoName
      }

      const response = await postApiAuth(API_PATH.NEW_DEBT_INFO, requestBody);
      if (response.ok) {
        successToast();
      } else {
        warningToast();
      }
    }
  }

  return (
    <div>
      <div className="card card-primary">
        <div className="card-body">
          <select className="form-control mb-3" onChange={selectType}>
            <option value={"expense"}>Chi tiền</option>
            <option value={"income"}>Thu tiền</option>
            <option value={"lend"}>Đi vay</option>
            <option value={"borrow"}>Cho vay</option>
          </select>
          <div className="form-group">
            <label htmlFor="amount">Số tiền (đ) <RequireStar /></label>
            <input type="number" className="form-control" id="amount" placeholder="Số tiền" required onChange={(e) => setAmount(e.target.value)} />
          </div>
          {/* <div className="form-group">
            <label htmlFor="inputeFile">Ảnh gợi nhớ</label>
            <div className="input-group">
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="inputeFile" />
                <label className="custom-file-label" htmlFor="inputeFile">Chọn file</label>
              </div>
            </div>
          </div> */}
          <div className="form-group">
            <label>Thời gian <RequireStar /></label>
            <DateTimePicker format="dd-MM-y" onChange={setDate} value={date} className="ml-3" />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Mô tả</label>
            <input type="amount" className="form-control" id="amount" placeholder="Mô tả" onChange={(e) => setDescription(e.target.value)} />
          </div>

          {selected === "expense" ? <NewExpenseIncomeForm wallets={wallets} categories={expenseCategories} setWalletNo={setWalletNo} setCategoryNo={setCategoryNo} /> : null}
          {selected === "income" ? <NewExpenseIncomeForm wallets={wallets} categories={incomeCategories} setWalletNo={setWalletNo} setCategoryNo={setCategoryNo} /> : null}
          {selected === "lend" ? <NewDebtForm label={"Người cho vay"} currentUserDebtInfo={currentUserDebtInfo} newUserDebt={newUserDebt} setNewUserDebt={setNewUserDebt} setUserDebtInfoNo={setUserDebtInfoNo} setUserDebtInfoName={setUserDebtInfoName} setExpectCollectDate={setExpectCollectDate} /> : null}
          {selected === "borrow" ? <NewDebtForm label={"Người mượn"} currentUserDebtInfo={currentUserDebtInfo} newUserDebt={newUserDebt} setNewUserDebt={setNewUserDebt} setUserDebtInfoNo={setUserDebtInfoNo} setUserDebtInfoName={setUserDebtInfoName} setExpectCollectDate={setExpectCollectDate} /> : null}

        </div>

        <div className="card-footer">
          <button type="submit" className="btn btn-primary" onClick={submit}>Lưu</button>
        </div>

      </div>
    </div>
  );
}

const AddRecord = () => {

  const [wallets, setWallets] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [currentUserDebtInfo, setCurrentUserDebtInfo] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const walletResponse = await getApiAuth(API_PATH.GET_ALL_WALLETS);
      if (walletResponse.ok) {
        const body = await walletResponse.json();
        setWallets(body["wallets"]);
      }

      const expenseResponse = await getApiAuth(API_PATH.GET_ALL_EXPENSE_CATEGORIES);
      if (expenseResponse.ok) {
        const body = await expenseResponse.json();
        setExpenseCategories(body);
      }

      const incomeResponse = await getApiAuth(API_PATH.GET_ALL_INCOME_CATEGORIES);
      if (incomeResponse.ok) {
        const body = await incomeResponse.json();
        setIncomeCategories(body);
      }

      const userDebtInfoResponse = await getApiAuth(API_PATH.GET_ALL_USER_DEBT_INFO);
      if (userDebtInfoResponse.ok) {
        const body = await userDebtInfoResponse.json();
        setCurrentUserDebtInfo(body);
      }
    }

    fetchData();

  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="content-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Tạo mới</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/home">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item activate">Tạo mới</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <AddRecordForm wallets={wallets} expenseCategories={expenseCategories} incomeCategories={incomeCategories} currentUserDebtInfo={currentUserDebtInfo} />
      </div>

    </div>
  );
}

export default AddRecord;