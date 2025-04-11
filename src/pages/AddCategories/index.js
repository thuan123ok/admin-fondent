import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersAdd } from "../../services/Api";

const AddUsers = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_full: "",
    user_mail: "",
    user_pass: "",
    user_re_pass: "",
    user_level: "1", // mặc định là admin
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      user_full: "",
      user_mail: "",
      user_pass: "",
      user_re_pass: "",
      user_level: "1",
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.user_pass !== form.user_re_pass) {
      return setError("Mật khẩu không khớp");
    }

    try {
      await getUsersAdd({
        full_name: form.user_full,
        email: form.user_mail,
        password: form.user_pass,
        role: form.user_level === "1" ? "admin" : "user",
      });

      setSuccess("Thêm thành viên thành công");
      setError("");
      handleReset();

      // ✅ Chuyển hướng sau khi thêm thành công
      navigate("/users");
    } catch (err) {
      if (err.response?.data === "email đã tồn tại") {
        setError("Email đã tồn tại!");
      } else {
        setError("Lỗi khi thêm thành viên");
      }
      setSuccess("");
    }
  };

  return (
    <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
      <div className="row">
        <ol className="breadcrumb">
          <li>
            <a href="#">
              <svg className="glyph stroked home">
                <use xlinkHref="#stroked-home" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">Quản lý thành viên</a>
          </li>
          <li className="active">Thêm thành viên</li>
        </ol>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Thêm thành viên</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="col-md-8">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}
                <form role="form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Họ &amp; Tên</label>
                    <input
                      name="user_full"
                      required
                      className="form-control"
                      value={form.user_full}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="user_mail"
                      required
                      type="email"
                      className="form-control"
                      value={form.user_mail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                      name="user_pass"
                      required
                      type="password"
                      className="form-control"
                      value={form.user_pass}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <input
                      name="user_re_pass"
                      required
                      type="password"
                      className="form-control"
                      value={form.user_re_pass}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Quyền</label>
                    <select
                      name="user_level"
                      className="form-control"
                      value={form.user_level}
                      onChange={handleChange}
                    >
                      <option value="1">Admin</option>
                      <option value="2">Member</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success">
                    Thêm mới
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-default"
                  >
                    Làm mới
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
