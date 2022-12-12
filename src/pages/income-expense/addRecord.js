import React, { useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import DateTimePicker from "react-datetime-picker";
import $ from "jquery";
import Swal from "sweetalert2";
import useScript from "../../common/useScript";

const NewExpenseForm = () => {
  return (
    <div>
      <div className="form-group">
        <label>Chọn hạng mục</label>
        <select class="form-control mb-3">
          <option>Ăn uống</option>
          <option>Di chuyển</option>
          <option>Giải trí</option>
          <option>Quần áo</option>
        </select>
      </div>

      <div className="form-group">
        <label>Tài khoản</label>
        <select class="form-control mb-3">
          <option>Ví 1</option>
          <option>Ví 2</option>
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

const AddRecordForm = () => {
  const [date, onDateChange] = useState(new Date());
  const [selected, setSelected] = useState("expense");

  const selectType = (e) => {
    setSelected(e.target.value);
  }

  return (
    <div>
      <div className="card card-primary">
        <form>
          <div className="card-body">
            <select className="form-control mb-3" onChange={selectType}>
              <option value={"expense"}>Chi tiền</option>
              <option value={"income"}>Thu tiền</option>
              <option value={"lend"}>Đi vay</option>
              <option value={"borrow"}>Cho vay</option>
            </select>
            <div className="form-group">
              <label htmlFor="amount">Số tiền (đ)</label>
              <input type="amount" className="form-control" id="amount" placeholder="Số tiền" required />
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
              <DateTimePicker format="h:mm:ss dd-MM-y a" onChange={onDateChange} value={date} className="ml-3" />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Mô tả</label>
              <input type="amount" className="form-control" id="amount" placeholder="Mô tả" />
            </div>

            {selected === "expense" ? <NewExpenseForm /> : null}
            {selected === "income" ? <NewIncomeForm /> : null}
            {selected === "lend" ? <NewLendForm /> : null}
            {selected === "borrow" ? <NewBorrowForm /> : null}

          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary swalDefaultSuccess">Lưu</button>
          </div>

        </form>
      </div>
    </div>
  );
}

const AddRecord = () => {

  useScript($(function () {
    var Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    $('.swalDefaultSuccess').click(function () {
      Toast.fire({
        icon: 'success',
        title: 'Lưu bản ghi thành công'
      })
    });
  }));

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
        <AddRecordForm />
      </div>

    </div>
  );
}

export default AddRecord;