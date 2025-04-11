import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="row">
      <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
        <div className="login-panel panel panel-default">
          <div className="panel-heading">
            Vietpro Mobile Shop - Administrator
          </div>
          <div className="panel-body">
            <div className="alert alert-danger">Tài khoản không hợp lệ !</div>
            <form role="form" method="post">
              <fieldset>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="E-mail"
                    name="email"
                    type="email"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Mật khẩu"
                    name="password"
                    type="password"
                    value=""
                  />
                </div>
                <div className="checkbox">
                  <label>
                    <input
                      name="remember"
                      type="checkbox"
                      value="Remember Me"
                    />
                    Nhớ tài khoản
                  </label>
                </div>
                <Link to="/" type="submit" className="btn btn-primary">
                  Đăng nhập
                </Link>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
