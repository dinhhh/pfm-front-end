import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const history = useHistory();

    const onSubmit = () => {
        // TODO
        if (email === "admin" && pw === "admin") {
            history.push("/home");
        }
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope" />
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" onChange={(event) => setPw(event.target.value)} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Sign In</button>
                            </div>
                        </div>
                        <div className="social-auth-links text-center mb-3">
                            <p>- OR -</p>
                            <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                            </a>
                        </div>
                        <p className="mb-1">
                            <Link to="/forgot-password">I forgot my password</Link>
                        </p>
                        <p className="mb-0">
                            <Link to="/register">Register a new membership</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;