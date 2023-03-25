import { RequireStar } from "../../components/annotation";
import { AddButton } from "../../components/button";
import Modal from "../../components/modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import DateTimePicker from "react-datetime-picker";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useEffect, useState } from "react";
import { convertVNDToInt, convertToVNDFormat } from "../../common/stringFormat";
import { deleteApiAuth, getApiAuth, postApiAuth } from "../../common/apiCaller";
import { API_PATH } from "../../config/api";
import { buildCategory, convertDateToString } from "../../common/utils";
import { successToast, warningToast } from "../../common/toast";

const CreateBudget = ({ categoies, wallets }) => {
  const [amount, setAmount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedWallet, setWallet] = useState("");
  const [selectedCategory, setCategory] = useState("");
  const [name, setName] = useState("");
  const [periodCode, setPeriodCode] = useState(0);
  const options = buildCategory(categoies);

  const submitHandle = async () => {

    const requestBody = {
      "amount": parseInt(amount, 10),
      "periodTypeCode": periodCode,
      "walletNo": selectedWallet,
      "categoryNo": selectedCategory,
      "startDate": convertDateToString(startDate),
      "endDate": convertDateToString(endDate),
      "name": name
    };

    const response = await postApiAuth(API_PATH.NEW_LIMIT_EXPENSE, requestBody);
    if (response.ok) {
      successToast();
    } else {
      warningToast();
    }
  }

  return (
    <div>
      <h3>Thêm hạn mức chi</h3>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="amount">Số tiền (đ) <RequireStar /></label>
          <input type="number" className="form-control" id="amount" placeholder="Số tiền" require onChange={(e) => { setAmount(e.target.value) }} />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Tên <RequireStar /></label>
          <input type="amount" className="form-control" id="amount" placeholder="Mô tả" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Hạng mục <RequireStar /></label>
          <select className="form-control mb-3" onChange={(e) => setCategory(e.target.value)}>
            <option value={null}></option>
            {options.length !== 0 && options.map((object, index) => <option value={object["categoryNo"]}>{object["categoryName"]}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Tài khoản <RequireStar /></label>
          <select className="form-control mb-3" onChange={(e) => setWallet(e.target.value)}>
            <option value={null}></option>
            {
              wallets.length !== 0 && wallets.map((object, index) => <option value={object["walletNo"]}>{object["name"]}</option>)
            }
          </select>
        </div>

        <div className="form-group">
          <label>Loại kì hạn <RequireStar /></label>
          <select className="form-control mb-3" onChange={(e) => setPeriodCode(e.target.value)}>
            <option value={0}>Theo ngày</option>
            <option value={1}>Theo tuần</option>
            <option value={2}>Theo tháng</option>
            <option value={3}>Theo quý</option>
            <option value={4}>Theo năm</option>
          </select>
        </div>

        <div className="row">
          <div className="form-group col-6">
            <label>Ngày bắt đầu <RequireStar /></label>
            <DateTimePicker format="dd-MM-y" onChange={setStartDate} value={startDate} className="ml-3" />
          </div>
          <div className="form-group col-6">
            <label>Ngày kết thúc <RequireStar /></label>
            <DateTimePicker format="dd-MM-y" onChange={setEndDate} value={endDate} className="ml-3" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitHandle}>Lưu</button>
      </div>
    </div>
  );
}

const BudgetListingElement = ({ budgetNo, name, period, amount, remaining, dayLeft, walletName }) => {
  const now = remaining / amount * 100;

  const deleteBudget = async () => {
    const requestBody = {
      "limitExpenseNo": budgetNo
    }
    const response = await deleteApiAuth(API_PATH.DELETE_LIMIT_EXPENSE, requestBody);
    if (response.ok) {
      successToast("Xóa thành công");
      window.location.reload();
    } else {
      warningToast("Xóa thất bại. Thử lại sau")
    }
  }

  return (
    <div className="col">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="col-4">
          <div><b>{name}</b> - {walletName}</div>
          <div>{period}</div>
        </div>
        <div className="col-4">
          <div>{convertToVNDFormat(amount)} VNĐ</div>
        </div>
        <div className="col-4">
          <div>
            <i className="fas fa-trash" onClick={deleteBudget} />
          </div>
        </div>
      </div>
      {/* <ProgressBar now={now | 0} label={`${now}%`} /> */}
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="col-4">Còn lại: {dayLeft} ngày</div>
        {/* <div className="col-4">{convertToVNDFormat(remaining)} VNĐ</div> */}
        <div className="col-4"></div>
      </div>

      <hr />
    </div>
  );
}

const BudgetListing = ({ btnClickHandle, limitExpenseList }) => {
  const list = [];
  if (limitExpenseList != null || limitExpenseList.length !== 0) {
    for (var i = 0; i < limitExpenseList.length; i++) {
      const object = limitExpenseList[i];
      list.push(<BudgetListingElement
        name={object["name"]}
        period={object["startDate"] + " -> " + object["endDate"]}
        amount={object["amount"]}
        remaining={object["remainingAmount"]}
        dayLeft={object["dayLeft"]}
        walletName={object["walletName"]}
        budgetNo={object["limitExpenseNo"]} />);
    }
  }

  return (
    <div>
      <h3>Danh sách hạn mức chi <AddButton onClickFunc={btnClickHandle} /></h3>
      <div style={{ overflowY: "scroll", height: 500 }}>
        <>
          {list.length == 0 ? <div>Không có bản ghi</div> : list.map((object, i) => object)}
        </>
      </div>
    </div>
  );
}

const BudgetPage = () => {

  const [isShowCreateForm, setShowCreateForm] = useState(true);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [limitExpenseList, setLimitExpenseList] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const categoryResponse = await getApiAuth(API_PATH.GET_ALL_EXPENSE_CATEGORIES);
      if (categoryResponse.ok) {
        const body = await categoryResponse.json();
        setExpenseCategories(body);
      }

      const walletResponse = await getApiAuth(API_PATH.GET_ALL_WALLETS);
      if (walletResponse.ok) {
        const body = await walletResponse.json();
        setWallets(body["wallets"]);
      }

      const limitExpenseResponse = await getApiAuth(API_PATH.GET_ALL_LIMIT_EXPENSE);
      if (limitExpenseResponse.ok) {
        const body = await limitExpenseResponse.json();
        setLimitExpenseList(body);
      }
    }

    fetchData();

  }, [isShowCreateForm]);

  const createForm = <CreateBudget categoies={expenseCategories} wallets={wallets} />;

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        {isShowCreateForm && <Modal contentElement={createForm} setOpenModal={setShowCreateForm} />}
        <section className="content-header">
          <div className="content-fluid">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <BudgetListing btnClickHandle={() => setShowCreateForm(!isShowCreateForm)} limitExpenseList={limitExpenseList} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BudgetPage;