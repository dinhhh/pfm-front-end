import { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState(null);
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="content-fluid">
            <div className="col">
              <div className='form-group'>
                <input type="password" className="form-control" id="description" placeholder="Nhập mật khẩu hiện tại" onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <input type="password" className="form-control" id="description" placeholder="Nhập mật khẩu mới" onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Lưu</button>
          </div>
        </section>
      </div >
    </div >
  );
}

export default ChangePassword;