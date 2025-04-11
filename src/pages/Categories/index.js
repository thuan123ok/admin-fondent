import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCategories, getCategoriesDelete } from "../../services/Api";
import Pagination from "../../shared/components/pagination";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [pages, setPages] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  useEffect(() => {
    const limit = 10;
    getCategories({
      params: {
        page: currentPage,
        limit,
      },
    })
      .then((res) => {
        const { docs, pages } = res.data.data;

        console.log("✅ API TRẢ VỀ:");
        console.log("↪️ docs:", docs);
        console.log("↪️ pages:", pages);
        console.log("↪️ filters:", res.data.filters); // có thể undefined, chỉ log nếu cần

        setCategories(docs);
        setPages(pages);
      })
      .catch((error) => {
        console.log("❌ Lỗi:", error);
      });
  }, [currentPage]);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này?"
    );
    if (!confirmDelete) return;

    try {
      const res = await getCategoriesDelete(id);
      if (res.data.status === "success") {
        setMessage(res.data.message);
        setCategories();
        navigate("/categories");
      }
    } catch (err) {
      if (err.response && err.response.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Đã xảy ra lỗi khi xóa danh mục.");
      }
    }
  };
  const handlePageChange = (page) => {
    console.log("🔁 Đổi sang trang:", page);
    setSearchParams({ page });
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
          <li className="active">Quản lý danh mục</li>
        </ol>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Quản lý danh mục</h1>
        </div>
      </div>

      <div id="toolbar" className="btn-group">
        <Link to="/categories/add" className="btn btn-success">
          <i className="glyphicon glyphicon-plus" /> Thêm danh mục
        </Link>
      </div>

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <table
                data-toolbar="#toolbar"
                data-toggle="table"
                className="table"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={index}>
                      <td>{category._id}</td>
                      <td>{category.name}</td>
                      <td className="form-group">
                        <Link
                          to={`/categories/edit/${category._id}`}
                          className="btn btn-primary"
                        >
                          <i className="glyphicon glyphicon-pencil" />
                        </Link>
                        <Link
                          to={`/categories/delete/${category._id}`}
                          className="btn btn-danger"
                          style={{ marginLeft: "5px" }}
                          onClick={() => handleDelete(category._id)}
                        >
                          <i className="glyphicon glyphicon-remove" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div id="pagination">
              <Pagination pages={pages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
