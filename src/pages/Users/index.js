import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, getUsersDelete } from "../../services/Api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Thêm jQuery
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-1.11.1.min.js";
    jqueryScript.async = true;
    document.body.appendChild(jqueryScript);

    // Thêm Bootstrap JS
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js";
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);

    // Thêm Bootstrap Table JS
    const tableScript = document.createElement("script");
    tableScript.src =
      "https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.js";
    tableScript.async = true;
    document.body.appendChild(tableScript);

    return () => {
      document.body.removeChild(jqueryScript);
      document.body.removeChild(bootstrapScript);
      document.body.removeChild(tableScript);
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn là xóa thành viên này không!"
    );
    if (!confirmDelete) return;

    try {
      const res = await getUsersDelete(id);
      if (res.data.status === "success") {
        setMessage(res.data.message);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }
    } catch (error) {
      if (error.response && error.response.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Đã xảy ra lỗi!");
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
          <li className="active">Danh sách thành viên</li>
        </ol>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Danh sách thành viên</h1>
        </div>
      </div>

      <div id="toolbar" className="btn-group">
        <Link to="/users/add" className="btn btn-success">
          <i className="glyphicon glyphicon-plus" /> Thêm thành viên
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}

              <table data-toolbar="#toolbar" data-toggle="table">
                <thead>
                  <tr>
                    <th data-field="id" data-sortable="true">
                      ID
                    </th>
                    <th data-field="name" data-sortable="true">
                      Họ &amp; Tên
                    </th>
                    <th data-field="email" data-sortable="true">
                      Email
                    </th>
                    <th>Quyền</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user._id}</td>
                      <td>{user.full_name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`label ${
                            user.role === "1" ? "label-danger" : "label-warning"
                          }`}
                        >
                          {user.role === "1" ? "Admin" : "Member"}
                        </span>
                      </td>
                      <td className="form-group">
                        <Link
                          to={`/users/edit/${user._id}`}
                          className="btn btn-primary"
                        >
                          <i className="glyphicon glyphicon-pencil" />
                        </Link>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-danger"
                          style={{ marginLeft: "5px" }}
                        >
                          <i className="glyphicon glyphicon-remove" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel-footer">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      «
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      »
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
