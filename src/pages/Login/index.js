import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Http from "../../services/Http";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // In your setCookie function, modify it to include domain and SameSite attributes
  const setCookie = (name, value, minutes = null) => {
    const expires = minutes
      ? `expires=${new Date(Date.now() + minutes * 60 * 1000).toUTCString()}`
      : "";
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  };

  // Then in your handleSubmit function, make sure you're using the correct token
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Http.post("/admin/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.accessToken) {
        setCookie("accessToken", response.data.accessToken, 0.5);
        login(response.data.accessToken);
        navigate("/");
      }
    } catch (err) {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row">
      <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
        <div className="login-panel panel panel-default">
          <div className="panel-heading">
            Vietpro Mobile Shop - Administrator
          </div>
          <div className="panel-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form role="form" onSubmit={handleSubmit}>
              <fieldset>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="E-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Mật khẩu"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
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
                <button type="submit" className="btn btn-primary">
                  Đăng nhập
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
