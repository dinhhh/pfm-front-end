import { saveToken } from "../common/localStorage";
import LoadingComponent from "../components/loading";
import { warningToast } from "../common/toast";
import { API_PATH } from "../config/api";
import { postApi } from "../common/apiCaller";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async () => {
    if (!(email && pw)) {
      warningToast("Nhập thiếu thông tin");
    }

    const requestBody = {
      "email": email,
      "password": pw
    };

    setLoading(true);
    const response = await postApi(API_PATH.SIGN_IN, requestBody);
    setLoading(false);

    if (response.ok) {
      history.push("/home");
      // TODO: store token in response by redux.....
      const responseBody = await response.json();
      const token = responseBody["token"];
      console.log("token ", token);
      saveToken(token);
    } else {
      warningToast("Tài khoản hoặc mật khẩu không chính xác");
    }
  }

  return (
    <div>
      {loading ? <LoadingComponent loading={loading} /> :
        <div className="hold-transition login-page">
          <div className="login-box">
            <div className="card">
              <div className="card-body login-card-body">
                <p className="login-box-msg">Đăng nhập để sử dụng ứng dụng</p>
                <div className="input-group mb-3">
                  <input type="email" className="form-control" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control" placeholder="Mật khẩu" onChange={(event) => setPw(event.target.value)} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">
                        Lưu đăng nhập
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Đăng nhập</button>
                  </div>
                </div>
                <div className="social-auth-links text-center mb-3">
                  <p>- Hoặc -</p>
                  <a href="#" className="btn btn-block btn-primary">
                    <i className="fab fa-facebook mr-2" /> Đăng nhập sử dụng Facebook
                  </a>
                  <a href="#" className="btn btn-block btn-danger">
                    <i className="fab fa-google-plus mr-2" /> Đăng nhập sử dụng Google+
                  </a>
                </div>
                <p className="mb-1">
                  <Link to="/forgot-password">Quên mật khẩu</Link>
                </p>
                <p className="mb-0">
                  <Link to="/register">Đăng ký tài khoản mới</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default LoginPage;