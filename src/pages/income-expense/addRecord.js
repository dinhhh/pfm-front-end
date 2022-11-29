import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

const AddRecordForm = () => {
  return (
    <div>
    <div className="card card-primary">
      <form>
        <div className="card-body">
          <select class="form-control mb-3">
            <option>Chi tiền</option>
            <option>Thu tiền</option>
            <option>Đi vay</option>
            <option>Cho vay</option>
          </select>
          {/* <div className="form-group row">
            <div class="form-check ml-2">
              <input class="form-check-input" type="radio" name="radio0" />
              <label class="form-check-label">Chi tiền</label>
            </div>
            <div class="form-check ml-2">
              <input class="form-check-input" type="radio" name="radio1" />
              <label class="form-check-label">Thu tiền</label>
            </div>
            <div class="form-check ml-2">
              <input class="form-check-input" type="radio" name="radio2" />
              <label class="form-check-label">Đi vay</label>
            </div>
            <div class="form-check ml-2">
              <input class="form-check-input" type="radio" name="radio3" />
              <label class="form-check-label">Cho vay</label>
            </div>
          </div> */}
          <div className="form-group">
            <label htmlFor="amount">Số tiền</label>
            <input type="amount" className="form-control" id="amount" placeholder="Số tiền" />
          </div>
          <div className="form-group">
            <label htmlFor="inputeFile">Ảnh gợi nhớ</label>
            <div className="input-group">
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="inputeFile" />
                <label className="custom-file-label" htmlFor="inputeFile">Chọn file</label>
              </div>
              <div className="input-group-append">
                <span className="input-group-text">Tải lên</span>
              </div>
            </div>
          </div>
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
            <label>Thời gian</label>
            <button type="button" class="btn btn-default">Launch Default Modal</button>
          </div>
          <div className="form-group">
            <label>Nguồn tiền</label>
            <select class="form-control mb-3">
              <option>Ví 1</option>
              <option>Ví 2</option>
            </select>
          </div>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
);
}

const AddRecord = () => {
  return (
    <div>
      <Header></Header>
      <Sidebar></Sidebar>
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

        <div className="">
        <AddRecordForm></AddRecordForm>
      </div>
      </div>
      
    </div>
);
}

export default AddRecord;