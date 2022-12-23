import DateTimePicker from "react-datetime-picker";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useState } from "react";
import { convertVNDToInt, convertToVNDFormat } from "../../common/stringFormat";

const AddTransactions = () => {
  const [amount, setAmount] = useState(0);
  const [startDate, setStartDateChange] = useState(new Date());
  const [endDate, setEndDateChange] = useState(new Date());
  const [selected, setSelected] = useState("expense");
  const [frequency, setFrequency] = useState("by-daily");

  return (
    <div>
      <h3 className="ml-3">Tạo mới</h3>
      <form>
        <div className="card-body">
          <select className="form-control mb-3" onChange={(e) => setSelected(e.target.value)}>
            <option value={"expense"}>Chi tiền</option>
            <option value={"income"}>Thu tiền</option>
          </select>
          <div className="form-group">
            <label htmlFor="amount">Số tiền (đ)</label>
            <input type="amount" className="form-control" id="amount" placeholder="Số tiền" required value={convertToVNDFormat(amount)} onChange={(e) => { setAmount(convertVNDToInt(e.target.value)) }} />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Mô tả</label>
            <input type="amount" className="form-control" id="amount" placeholder="Mô tả" />
          </div>
          <div className="form-group">
            <label>Bắt đầu</label>
            <DateTimePicker format="h:mm:ss dd-MM-y a" onChange={setStartDateChange} value={startDate} className="ml-3" />
          </div>
          <div className="form-group">
            <label>Kết thúc</label>
            <DateTimePicker format="h:mm:ss dd-MM-y a" onChange={setEndDateChange} value={endDate} className="ml-3" />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Chu kỳ</label>
            <select className="form-control mb-3" onChange={(e) => setFrequency(e.target.value)}>
              <option value={"by-daily"}>Hàng ngày</option>
              <option value={"by-weekly"}>Hàng tuần</option>
              <option value={"by-monthly"}>Hàng tháng</option>
              <option value={"by-quaterly"}>Hàng quý</option>
              <option value={"by-yearly"}>Hàng năm</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary swalDefaultSuccess">Lưu</button>
        </div>
      </form>
    </div>
  );
}

const TransactionListing = () => {

  return (
    <div>
      <h3 className="ml-3">Danh sách ghi chép định kỳ</h3>
    </div>
  );
}

const UpcomingTransactions = () => {

  return (
    <div>
      <h3 className="ml-3">Ghi chép sẵn diễn ra</h3>
    </div>
  );
}

const RecurringTransactions = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
        <div className="row">
          <div className="col-6">
            <AddTransactions />
            <UpcomingTransactions />
          </div>
          <div className="col-6">
            <TransactionListing />
          </div>
        </div>
        </section>
      </div>
    </div>
  );
}

export default RecurringTransactions;