import ProgressBar from "react-bootstrap/ProgressBar";
import DateTimePicker from "react-datetime-picker";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useState } from "react";
import { convertVNDToInt, convertToVNDFormat } from "../../common/stringFormat";

const CreateBudget = () => {
  const [amount, setAmount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <h3>Thêm giới hạn chi</h3>
      <form>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="amount">Số tiền (đ)</label>
            <input type="amount" className="form-control" id="amount" placeholder="Số tiền" require value={convertToVNDFormat(amount)} onChange={(e) => {setAmount(convertVNDToInt(e.target.value))}} />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Tên</label>
            <input type="amount" className="form-control" id="amount" placeholder="Mô tả" />
          </div>

          <div className="form-group">
            <label>Hạng mục</label>
            <select className="form-control mb-3">
              <option>Sinh hoạt</option>
              <option>Vui chơi</option>
              <option>Thuốc men</option>
              <option>Đi lại</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tài khoản</label>
            <select className="form-control mb-3">
              <option>Ví 1</option>
              <option>Ví 2</option>
            </select>
          </div>

          <div className="form-group">
            <label>Loại kì hạn</label>
            <select className="form-control mb-3">
              <option>Theo tháng</option>
              <option>Theo quý</option>
              <option>Theo năm</option>
            </select>
          </div>

          <div className="row">
            <div className="form-group col-6">
              <label>Ngày bắt đầu</label>
              <DateTimePicker format="dd-MM-y" onChange={setStartDate } value={startDate} className="ml-3" />
            </div>
            <div className="form-group col-6">
              <label>Ngày kết thúc</label>
              <DateTimePicker format="dd-MM-y" onChange={setEndDate} value={endDate} className="ml-3" />
            </div>
          </div>

          <div className="form-group">
            <label>Dồn sang kì sau</label>
            <input type="checkbox" value="Bike" className="ml-2" />
          </div>

          <button type="submit" className="btn btn-primary swalDefaultSuccess">Lưu</button>
        </div>
      </form>
    </div>
  );
}

const BudgetListingElement = ({ name, period, amount, remaining }) => {
  const now = remaining / amount * 100;
  return (
    <div className="col">
      <div className="row" style={{justifyContent: "space-between"}}>
        <div className="col-6">
          <div>{name}</div>
          <div>{period}</div>
        </div>
        <div className="col-6">
          <div>{convertToVNDFormat(amount)} VNĐ</div>
        </div>
      </div>
      <ProgressBar now={now | 0} label={`Today`} />
      <div className="row" style={{justifyContent: "space-between"}}>
        <div className="col-6">Còn 11 ngày</div>
        <div className="col-6">{convertToVNDFormat(remaining)} VNĐ</div>
      </div>

      <hr />
    </div>
  );
}

const BudgetListing = () => {
  const list = [];
  for (var i = 0; i < 20; i++) {
    list.push(<BudgetListingElement name={`${i} name`} period={"1/12 - 12/12"} amount={2000000} remaining={1000000} />);
  }

  return (
    <div>
      <h3>Danh sách giới hạn chi</h3>
      <div style={{overflowY: "scroll", height: 500}}>
      <>
        {list.length == 0 ? <div>Không có bản ghi</div> : list.map((object, i) => object)}
      </>
      </div>
    </div>
  );
}

const BudgetPage = () => {

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="content-fluid">
            <div className="row">
              <div className="col-6">
                <CreateBudget />
              </div>
              <div className="col-6">
                <BudgetListing />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BudgetPage;