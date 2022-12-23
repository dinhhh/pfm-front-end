import LoadingComponent from "../components/loading";
import { postApi } from "../common/apiCaller";
import { Link } from "react-router-dom";
import { useState } from "react";
import { warningToast, successToast } from "../common/toast";
import { API_PATH } from "../config/api";

const Register = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [rePw, setRePw] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!(fullName && email && pw && rePw)) {
      warningToast("Nhập thiếu thông tin");
      return;
    }

    if (pw !== rePw) {
      warningToast("Mật khẩu không trùng nhau");
      return;
    }

    const requestBody = {
      "fullName": fullName,
      "email": email,
      "pw": pw
    };

    setLoading(true);
    const response = await postApi(API_PATH.SIGN_IN, requestBody);
    setLoading(false);

    if (response.ok) {
      successToast("Đăng ký tài khoản thành công");
    } else {
      warningToast("Tài khoản đã được đăng ký")
    }
  }

  return (
    <div>
      {
        loading ?
          <LoadingComponent loading={loading} />
          :
          <div className="hold-transition login-page">
            <div className="register-box">
              <div className="card">
                <div className="card-body register-card-body">
                  <p className="login-box-msg">Đăng ký tài khoản mới</p>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Họ tên" onChange={(e) => setFullName(e.target.value)} />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Mật khẩu" onChange={(e) => setPw(e.target.value)} />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Nhập lại mật khẩu" onChange={(e) => setRePw(e.target.value)} />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="col-6">
                      <button type="submit" className="btn btn-primary btn-block register-button" onClick={register}>Đăng ký</button>
                    </div>
                  </div>
                  <div className="social-auth-links text-center">
                    <p>- Hoặc -</p>
                    <a href="#" className="btn btn-block btn-primary">
                      <i className="fab fa-facebook mr-2" />
                      Đăng nhập sử dụng Facebook
                    </a>
                    <a href="#" className="btn btn-block btn-danger">
                      <i className="fab fa-google-plus mr-2" />
                      Đăng nhập sử dụng Google+
                    </a>
                  </div>
                  <Link to="/">Tôi đã có tài khoản</Link>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default Register;