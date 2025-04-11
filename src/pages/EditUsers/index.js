import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsersUpdt, getUsersById } from "../../services/Api";

const EditUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "1", // mặc định là Admin
  });
  const [message, setMessage] = useState("");

  // Lấy dữ liệu người dùng từ API
  useEffect(() => {
    getUsersById(id)
      .then((res) => {
        console.log("Dữ liệu trả về từ API:", res.data);
        setFormData({
          full_name: res.data.data.full_name,
          email: res.data.data.email,
          role: res.data.data.role.toString(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getUsersUpdt(id, formData); // truyền id để cập nhật
      console.log(formData);
      if (res.data.status === "success") {
        alert(res.data.massage);
        navigate("/users");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data); // lỗi email trùng
      } else {
        console.error(error);
      }
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
            <a href="/users">Quản lý thành viên</a>
          </li>
          <li className="active">{formData.full_name}</li>
        </ol>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Thành viên: {formData.full_name}</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="col-md-8">
                {message && <div className="alert alert-danger">{message}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Họ &amp; Tên</label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      className="form-control"
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Quyền</label>
                    <select
                      name="role"
                      className="form-control"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="1">Admin</option>
                      <option value="2">Member</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Cập nhật
                  </button>
                  <button type="reset" className="btn btn-default">
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

export default EditUsers;
