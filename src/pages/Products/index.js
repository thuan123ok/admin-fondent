import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getImageProduct } from "../../shared/ultils";
import { getProducts, getProductsDelete } from "../../services/Api";
import Pagination from "../../shared/components/pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const isFeatured = searchParams.get("is_featured") || "all";
  const [searchName, setSearchName] = useState(searchParams.get("name") || "");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const limit = 10;
    const params = { page: currentPage, limit };

    if (isFeatured !== "all") {
      params.is_featured = isFeatured;
    }

    if (searchName.trim()) {
      params.name = searchName;
    }

    getProducts({ params })
      .then((res) => {
        const { docs, pages } = res.data.data;
        setProducts(docs);
        setPages(pages);
      })
      .catch((error) => {
        console.error("❌ Lỗi API:", error);
      });
  }, [currentPage, isFeatured, searchParams]);

  useEffect(() => {
    const scriptElements = [];
    const scripts = [
      "/js/jquery-1.11.1.min.js",
      "/js/bootstrap.min.js",
      "/js/bootstrap-table.js",
    ];
    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      scriptElements.push(script);
    });
    return () => {
      scriptElements.forEach((script) => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set("page", page);
      return updated;
    });
  };

  const handleFeaturedChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set("page", 1);
      if (value === "all") updated.delete("is_featured");
      else updated.set("is_featured", value);
      return updated;
    });
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này?"
    );
    if (!confirmDelete) return;

    try {
      const res = await getProductsDelete(id);
      if (res.data.status === "success") {
        setMessage(res.data.message);
        // Cách 1: Lọc sản phẩm bị xóa ra khỏi danh sách
        setProducts((prevProducts) =>
          prevProducts.filter((item) => item._id !== id)
        );
      }
    } catch (err) {
      if (err.response && err.response.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Đã xảy ra lỗi khi xóa sản phẩm.");
      }
    }
  };
  const handleSearchSubmit = () => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set("page", 1);
      if (searchName.trim()) updated.set("name", searchName);
      else updated.delete("name");
      return updated;
    });
  };

  return (
    <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
      <div className="row">
        <ol className="breadcrumb">
          <li>
            <Link to="#">
              <svg className="glyph stroked home">
                <use xlinkHref="#stroked-home" />
              </svg>
            </Link>
          </li>
          <li className="active">Danh sách sản phẩm</li>
        </ol>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Danh sách sản phẩm</h1>
        </div>
      </div>

      <div id="toolbar" className="btn-group" style={{ marginBottom: 10 }}>
        <Link to="/products/add" className="btn btn-success">
          <i className="glyphicon glyphicon-plus"></i> Thêm sản phẩm
        </Link>
      </div>

      {/* Tìm kiếm sản phẩm */}
      <div
        className="form-group"
        style={{
          width: 300,
          marginBottom: 20,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <label
          style={{
            fontWeight: 600,
            marginBottom: 8,
            display: "block",
            fontSize: 16,
          }}
        >
          Tìm kiếm sản phẩm
        </label>
        <div
          style={{
            display: "flex",
            borderRadius: 12,
            overflow: "hidden",
            background: "linear-gradient(135deg, #fbc2eb, #fcd56c)", // gradient hồng vàng
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên sản phẩm..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit();
            }}
            style={{
              flex: 1,
              padding: "10px 14px",
              border: "none",
              outline: "none",
              fontSize: 15,
              background: "transparent",
              color: "#333",
            }}
          />
          <button
            onClick={handleSearchSubmit}
            style={{
              padding: "10px 16px",
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              color: "#e91e63",
              fontWeight: 600,
              cursor: "pointer",
              borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
              transition: "0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 255, 255, 1)")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)")
            }
          >
            Tìm
          </button>
        </div>
      </div>

      {/* Bộ lọc sản phẩm nổi bật */}
      <div className="form-group" style={{ width: 200 }}>
        <label>Sản phẩm nổi bật</label>
        <select
          className="form-control"
          onChange={handleFeaturedChange}
          value={isFeatured}
        >
          <option value="all">Tất cả</option>
          <option value="true">Chỉ nổi bật</option>
          <option value="false">Không nổi bật</option>
        </select>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <table
                data-toolbar="#toolbar"
                data-toggle="table"
                className="table table-bordered"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Ảnh sản phẩm</th>
                    <th>Trạng thái</th>
                    <th>Nổi bật</th>
                    <th>Danh mục</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.price.toLocaleString("vi-VN")} VND</td>
                      <td style={{ textAlign: "center" }}>
                        <img
                          width="130"
                          height="180"
                          src={getImageProduct(item.image)}
                          alt={item.name}
                        />
                      </td>
                      <td>
                        <span
                          className={`label ${
                            item.is_stock ? "label-success" : "label-danger"
                          }`}
                        >
                          {item.is_stock ? "Còn hàng" : "Hết hàng"}
                        </span>
                      </td>
                      <td>
                        {item.is_featured ? (
                          <span className="label label-warning">
                            🔥 Nổi bật
                          </span>
                        ) : (
                          <span className="label label-default">Thường</span>
                        )}
                      </td>
                      <td>{item.category_id?.name}</td>
                      <td className="form-group">
                        <Link
                          to={`/products/edit/${item._id}`}
                          className="btn btn-primary"
                        >
                          <i className="glyphicon glyphicon-pencil"></i>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          <i className="glyphicon glyphicon-remove"></i>
                        </button>
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

export default Products;
