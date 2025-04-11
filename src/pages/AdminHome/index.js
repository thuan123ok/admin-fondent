import React, { useEffect, useState } from "react";
import { getAdmin } from "../../services/Api";

const Admin = () => {
  // State để lưu trữ dữ liệu
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [comments, setComments] = useState(0);
  const [categories, setCategories] = useState(0);

  // State để quản lý trạng thái tải dữ liệu và lỗi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    getAdmin()
      .then((res) => {
        console.log(res); // Kiểm tra dữ liệu trả về từ API
        if (res.data) {
          setUsers(res.data.data.users);
          setProducts(res.data.data.products);
          setComments(res.data.data.comments);
          setCategories(res.data.data.categories);
          setLoading(false); // Dữ liệu đã được tải xong
        } else {
          setError("Dữ liệu không hợp lệ.");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // In lỗi nếu có
        setError("Lỗi khi tải dữ liệu");
        setLoading(false); // Dữ liệu tải không thành công
      });
  }, []);

  // Hiển thị khi đang tải dữ liệu
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
      <div className="row">
        <ol className="breadcrumb">
          <li>
            <a href="#">
              <svg className="glyph stroked home">
                <use xlinkHref="#stroked-home"></use>
              </svg>
            </a>
          </li>
          <li className="active">Trang chủ quản trị</li>
        </ol>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Trang chủ quản trị</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-md-6 col-lg-3">
          <div className="panel panel-blue panel-widget">
            <div className="row no-padding">
              <div className="col-sm-3 col-lg-5 widget-left">
                <svg className="glyph stroked bag">
                  <use xlinkHref="#stroked-bag"></use>
                </svg>
              </div>
              <div className="col-sm-9 col-lg-7 widget-right">
                <div className="large">{products}</div>
                <div className="text-muted">Sản Phẩm</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-6 col-lg-3">
          <div className="panel panel-orange panel-widget">
            <div className="row no-padding">
              <div className="col-sm-3 col-lg-5 widget-left">
                <svg className="glyph stroked empty-message">
                  <use xlinkHref="#stroked-empty-message"></use>
                </svg>
              </div>
              <div className="col-sm-9 col-lg-7 widget-right">
                <div className="large">{comments}</div>
                <div className="text-muted">Bình Luận</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-6 col-lg-3">
          <div className="panel panel-teal panel-widget">
            <div className="row no-padding">
              <div className="col-sm-3 col-lg-5 widget-left">
                <svg className="glyph stroked male-user">
                  <use xlinkHref="#stroked-male-user"></use>
                </svg>
              </div>
              <div className="col-sm-9 col-lg-7 widget-right">
                <div className="large">{users}</div>
                <div className="text-muted">Thành Viên</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-6 col-lg-3">
          <div className="panel panel-red panel-widget">
            <div className="row no-padding">
              <div className="col-sm-3 col-lg-5 widget-left">
                <svg className="glyph stroked app-window-with-content">
                  <use xlinkHref="#stroked-app-window-with-content"></use>
                </svg>
              </div>
              <div className="col-sm-9 col-lg-7 widget-right">
                <div className="large">{categories}</div>
                <div className="text-muted">Danh mục</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
