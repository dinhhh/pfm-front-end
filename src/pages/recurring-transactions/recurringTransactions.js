import { getApiAuth, postApiAuth, putApiAuth, deleteApiAuth } from "../../common/apiCaller";
import Modal from "../../components/modal";
import DateTimePicker from "react-datetime-picker";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useEffect, useState } from "react";
import { convertVNDToInt, convertToVNDFormat } from "../../common/stringFormat";
import { AddButton } from "../../components/button";
import { RequireStar } from "../../components/annotation";
import { convertDateToString } from "../../common/utils";
import { API_PATH } from "../../config/api";
import { successToast, warningToast } from "../../common/toast";

const AddTransactions = () => {
  const [amount, setAmount] = useState(0);
  const [startDate, setStartDateChange] = useState(new Date());
  const [endDate, setEndDateChange] = useState(new Date());
  const [operationCode, setOperationCode] = useState(0);
  const [periodCode, setPeriodCode] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const submit = async () => {
    const requestBody = {
      "amount": amount,
      "operationCode": operationCode,
      "startDate": convertDateToString(startDate),
      "endDate": convertDateToString(endDate),
      "periodCode": periodCode,
      "description": description,
      "name": name
    };

    const response = await postApiAuth(API_PATH.NEW_RECURRING_TRANSACTION, requestBody);
    if (response.ok) {
      successToast();
    } else {
      warningToast();
    }
  }

  return (
    <div>
      <h3 className="ml-3">Tạo mới</h3>
      <div className="card-body">
        <select className="form-control mb-3" onChange={(e) => setOperationCode(e.target.value)}>
          <option value={0}>Chi tiền</option>
          <option value={1}>Thu tiền</option>
        </select>
        <div className="form-group">
          <label htmlFor="amount">Tên <RequireStar /></label>
          <input type="amount" className="form-control" id="amount" placeholder="Mô tả" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Số tiền (đ) <RequireStar /></label>
          <input type="amount" className="form-control" id="amount" placeholder="Số tiền" required value={convertToVNDFormat(amount)} onChange={(e) => { setAmount(convertVNDToInt(e.target.value)) }} />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Mô tả</label>
          <input type="amount" className="form-control" id="amount" placeholder="Mô tả" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Bắt đầu <RequireStar /></label>
          <DateTimePicker format="h:mm:ss dd-MM-y a" onChange={setStartDateChange} value={startDate} className="ml-3" />
        </div>
        <div className="form-group">
          <label>Kết thúc <RequireStar /></label>
          <DateTimePicker format="h:mm:ss dd-MM-y a" onChange={setEndDateChange} value={endDate} className="ml-3" />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Chu kỳ <RequireStar /></label>
          <select className="form-control mb-3" onChange={(e) => setPeriodCode(e.target.value)}>
            <option value={0}>Hàng ngày</option>
            <option value={1}>Hàng tuần</option>
            <option value={2}>Hàng tháng</option>
            <option value={3}>Hàng quý</option>
            <option value={4}>Hàng năm</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" onClick={submit}>Lưu</button>
      </div>
    </div>
  );
}

const TransactionElement = ({ recurringTransactionNo, startDate, endDate, operationCode, description, name, amount, setReload }) => {

  const [isEditMode, setEditMode] = useState(false);
  const [newStartDate, setStartDate] = useState(new Date());
  const [newEndDate, setEndDate] = useState(new Date());

  const save = async () => {
    const requestBody = {
      "recurringTransactionNo": recurringTransactionNo,
      "startDate": convertDateToString(newStartDate),
      "endDate": convertDateToString(newEndDate),
      "description": document.getElementById("description").textContent,
      "name": document.getElementById("name").textContent,
      "amount": convertVNDToInt(document.getElementById("newAmount").textContent)
    };
    const response = await putApiAuth(API_PATH.EDIT_RECURRING_TRANSACTION, requestBody);
    if (response.ok) {
      successToast();
      setReload();
    } else {
      warningToast();
    }
  }

  const deleteTransaction = async () => {
    const requestBody = {
      "recurringTransactionNo": recurringTransactionNo,
    }
    const response = await deleteApiAuth(API_PATH.DELETE_RECURRING_TRANSACTION, requestBody);
    if (response.ok) {
      successToast("Xóa thành công");
      setReload();
    } else {
      warningToast("Xóa thất bại. Thử lại sau");
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-4">
          <div id="name" contentEditable={isEditMode}><b>{name}</b></div>
          <div>Mô tả: <div id="description" style={{display: "inline-block"}} contentEditable={isEditMode} >{description}</div></div>
        </div>
        <div className="col-4">
          <>
            {isEditMode ?
              <div>
                <div>
                  <label>Ngày bắt đầu <RequireStar /></label>
                  <DateTimePicker format="dd-MM-y" onChange={setStartDate} value={newStartDate} className="ml-3" />
                </div>
                <div>
                  <label>Ngày kết thúc <RequireStar /></label>
                  <DateTimePicker format="dd-MM-y" onChange={setEndDate} value={newEndDate} className="ml-3" />
                </div>
              </div> :
              <div>
                <div>Bắt đầu: {startDate}</div>
                <div>Kết thúc: {endDate}</div>
              </div>}
          </>
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col">
              <div style={operationCode === 0 ? { color: "red" } : { color: "green" }} >
                <>
                  {operationCode == 0 ? "Chi tiền" : "Thu tiền"}
                </>
              </div>
              <div id="newAmount" contentEditable={isEditMode}>{convertToVNDFormat(amount)}</div>
            </div>
            <div className="col">
              <div>
                <i className="fas fa-edit" onClick={() => setEditMode(!isEditMode)} />
              </div>
              <div>
                <i className="fa fa-trash" onClick={deleteTransaction} />
              </div>
              <div style={isEditMode ? { display: "block" } : { display: "none" }}>
                <button type="submit" className="btn btn-primary" onClick={save}>Lưu</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

const TransactionListing = ({ btnHandle, allTransactions, setReload }) => {
  const dayTransactionList = allTransactions.filter((transaction, index) => transaction["periodCode"] === 0);
  const weekTransactionList = allTransactions.filter((transaction, index) => transaction["periodCode"] === 1);
  const monthTransactionList = allTransactions.filter((transaction, index) => transaction["periodCode"] === 2);
  const quarterTransactionList = allTransactions.filter((transaction, index) => transaction["periodCode"] === 3);
  const yearTransactionList = allTransactions.filter((transaction, index) => transaction["periodCode"] === 4);
  const [showDayList, setShowDayList] = useState(false);
  const [showWeekList, setShowWeekList] = useState(false);
  const [showMonthList, setShowMonthList] = useState(false);
  const [showQuarterList, setShowQuarterList] = useState(false);
  const [showYearList, setShowYearList] = useState(false);

  return (
    <div>
      <h3 className="ml-3">Danh sách ghi chép định kỳ <AddButton onClickFunc={btnHandle} /></h3>
      <div className="px-3">
        <div className="row" style={{ justifyContent: "space-between" }} onClick={() => setShowDayList(!showDayList)}>
          <h5>Hàng ngày</h5>
          <i className={showDayList ? "fas fa-minus" : "fas fa-plus"} />
        </div>
        {dayTransactionList.length !== 0 && showDayList && dayTransactionList.map((object, index) => <TransactionElement recurringTransactionNo={object["recurringTransactionNo"]} startDate={object["startDate"]} endDate={object["endDate"]} operationCode={object["operationCode"]} description={object["description"]} name={object["name"]} amount={object["amount"]} setReload={setReload}/>)}
      </div>
      <hr />
      <div className="px-3">
        <div className="row" style={{ justifyContent: "space-between" }} onClick={() => setShowWeekList(!showWeekList)}>
          <h5>Hàng tuần</h5>
          <i className={showWeekList ? "fas fa-minus" : "fas fa-plus"} />
        </div>
        {weekTransactionList.length !== 0 && showWeekList && weekTransactionList.map((object, index) => <TransactionElement recurringTransactionNo={object["recurringTransactionNo"]} startDate={object["startDate"]} endDate={object["endDate"]} operationCode={object["operationCode"]} description={object["description"]} name={object["name"]} amount={object["amount"]} setReload={setReload}/>)}
      </div>
      <hr />
      <div className="px-3">
        <div className="row" style={{ justifyContent: "space-between" }} onClick={() => setShowMonthList(!showWeekList)}>
          <h5>Hàng tháng</h5>
          <i className={showMonthList ? "fas fa-minus" : "fas fa-plus"} />
        </div>
        {monthTransactionList.length !== 0 && showMonthList && monthTransactionList.map((object, index) => <TransactionElement recurringTransactionNo={object["recurringTransactionNo"]} startDate={object["startDate"]} endDate={object["endDate"]} operationCode={object["operationCode"]} description={object["description"]} name={object["name"]} amount={object["amount"]} setReload={setReload}/>)}
      </div>
      <hr />
      <div className="px-3">
        <div className="row" style={{ justifyContent: "space-between" }} onClick={() => setShowQuarterList(!showWeekList)}>
          <h5>Hàng quý</h5>
          <i className={showQuarterList ? "fas fa-minus" : "fas fa-plus"} />
        </div>
        {quarterTransactionList.length !== 0 && showQuarterList && quarterTransactionList.map((object, index) => <TransactionElement recurringTransactionNo={object["recurringTransactionNo"]} startDate={object["startDate"]} endDate={object["endDate"]} operationCode={object["operationCode"]} description={object["description"]} name={object["name"]} amount={object["amount"]} setReload={setReload}/>)}
      </div>
      <hr />
      <div className="px-3">
        <div className="row" style={{ justifyContent: "space-between" }} onClick={() => setShowYearList(!showWeekList)}>
          <h5>Hàng năm</h5>
          <i className={showYearList ? "fas fa-minus" : "fas fa-plus"} />
        </div>
        {yearTransactionList.length !== 0 && showYearList && yearTransactionList.map((object, index) => <TransactionElement recurringTransactionNo={object["recurringTransactionNo"]} startDate={object["startDate"]} endDate={object["endDate"]} operationCode={object["operationCode"]} description={object["description"]} name={object["name"]} amount={object["amount"]} setReload={setReload}/>)}
      </div>
      <hr />
    </div>
  );
}

const UpcomingTransactions = () => {
  return (
    <div>
      <h3 className="ml-3">Ghi chép sẵn diễn ra trong hôm nay</h3>
    </div>
  );
}

const RecurringTransactions = () => {

  const [isShowCreateForm, setShowCreateForm] = useState(true);
  const [allTransactions, setTransactions] = useState([]);
  const [needReload, setReload] = useState(false); // not work, consider remove latter
  const createForm = <AddTransactions />;

  useEffect(() => {

    async function fetchData() {
      const transactionResponse = await getApiAuth(API_PATH.GET_ALL_RECURRING_TRANSACTION);
      if (transactionResponse.ok) {
        const body = await transactionResponse.json();
        setTransactions(body);
      }
    }

    fetchData();

  }, []);

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
                  <TransactionListing btnHandle={() => setShowCreateForm(!isShowCreateForm)} allTransactions={allTransactions} setReload={() => setReload(!needReload)} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RecurringTransactions;