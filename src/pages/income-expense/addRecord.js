import { getApiAuth, postApiAuth } from "../../common/apiCaller";
import { useEffect } from "react";
import React, { useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import DateTimePicker from "react-datetime-picker";
import { API_PATH } from "../../config/api";
import { OPERATION_TYPE_CODE } from "../../config/constant";
import { successToast, warningToast } from "../../common/toast";

const NewExpenseForm = ({ wallets, expenseCategories, setWalletNo, setCategoryNo }) => {

  var options = [];
  for (var parent of expenseCategories) {
    var parentCategory = {
      "categoryNo": parent["parentCategoryNo"],
      "categoryName": parent["parentCategoryName"],
      "isParent": true
      };
      options.push(parentCategory);
  
      if (parent["subCategories"].length !== 0) {
        var sub = parent["subCategories"].map((c, i) => {
          return {
            "categoryNo": c["categoryNo"],
            "categoryName": c["name"],
            "isParent": false,
          };
        });
        options.push(...sub);
      }
  }

  return (
    <div>
      <div className="form-group">
        <label>Chọn hạng mục</label>
        <select class="form-control mb-3" onChange={(e) => setCategoryNo(e.target.value)}>
        <option value={null} selected={true}></option>
          {
            options.length !== 0 && options.map((object, index) => <option value={object["categoryNo"]}>{object["categoryName"]}</option>)
          }
        </select>
      </div>

      <div className="form-group">
        <label>Tài khoản</label>
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

const NewIncomeForm = () => {
  return (
    <div>
      <div className="form-group">
        <label>Chọn hạng mục</label>
        <select class="form-control mb-3">
          <option>Tiền lương</option>
          <option>Tiền thưởng</option>
          <option>Khác</option>
        </select>
      </div>

      <div className="form-group">
        <label>Nguồn tiền</label>
        <select class="form-control mb-3">
          <option>Ví 1</option>
          <option>Ví 2</option>
        </select>
      </div>
    </div>
  );
}

const NewLendForm = () => {
  const [collectionDate, setCollectionDate] = useState(new Date());

  return (
    <div>
      <div className="form-group">
        <label>Người cho vay</label>
        <select class="form-control mb-3">
          <option>Em Vinh</option>
          <option>Em Hiếu</option>
          <option>Anh Minh</option>
        </select>
      </div>
      <div className="form-group">
        <label>Thời gian hoàn trả dự kiến</label>
        <DateTimePicker format="h:mm:ss dd-MM-y a" onChange={setCollectionDate} value={collectionDate} className="ml-3" />
      </div>
    </div>
  );
}

const NewBorrowForm = () => {
  const [collectionDate, setCollectionDate] = useState(new Date());

  return (
    <div>
      <div className="form-group">
        <label>Người cho mượn</label>
        <select class="form-control mb-3">
          <option>Em Vinh</option>
          <option>Em Hiếu</option>
          <option>Anh Minh</option>
        </select>
      </div>
      <div className="form-group">
        <label>Thời gian hoàn trả dự kiến</label>
        <DateTimePicker format="h:mm:ss dd-MM-y a" onChange={setCollectionDate} value={collectionDate} className="ml-3" />
      </div>
    </div>
  );
}

const AddRecordForm = ({ wallets, expenseCategories, incomeCategories }) => {

  const [selected, setSelected] = useState("expense");
  const [walletNo, setWalletNo] = useState("");
  const [categoryNo, setCategoryNo] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

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

    const dayDate = date.getDay() > 10 ? date.getDay().toString() : "0" + date.getDay().toString(); 
    
    const requestBody = {
      "createdOn": date.getFullYear().toString() + "-" + date.getMonth().toString() + "-" + dayDate,
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
              <label htmlFor="amount">Số tiền (đ)</label>
              <input type="number" className="form-control" id="amount" placeholder="Số tiền" required onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="inputeFile">Ảnh gợi nhớ</label>
              <div className="input-group">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="inputeFile" />
                  <label className="custom-file-label" htmlFor="inputeFile">Chọn file</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Thời gian</label>
              <DateTimePicker format="h:mm:ss dd-MM-y a" onChange={setDate} value={date} className="ml-3" />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Mô tả</label>
              <input type="amount" className="form-control" id="amount" placeholder="Mô tả" onChange={(e) => setDescription(e.target.value)} />
            </div>

            {selected === "expense" ? <NewExpenseForm wallets={wallets} expenseCategories={expenseCategories} setWalletNo={setWalletNo} setCategoryNo={setCategoryNo} /> : null}
            {selected === "income" ? <NewIncomeForm /> : null}
            {selected === "lend" ? <NewLendForm /> : null}
            {selected === "borrow" ? <NewBorrowForm /> : null}

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
        <AddRecordForm wallets={wallets} expenseCategories={expenseCategories} />
      </div>

    </div>
  );
}

export default AddRecord;