import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="hold-transition login-page">
            <div className="register-box">
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Đăng ký tài khoản mới</p>
                        <form action="../../index.html" method="post">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Họ tên" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Mật khẩu" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Nhập lại mật khẩu" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="col-6">
                                    <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
                                </div>
                            </div>
                        </form>
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
    )
}

export default Register;