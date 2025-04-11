import { useEffect, useState } from "react";
import { getCategories, getProductsAdd } from "../../services/Api";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    accessories: "",
    promotion: "",
    status: "",
    category_id: "",
    is_stock: true,
    is_featured: true,
    details: "",
  });

  useEffect(() => {
    getCategories({ limit: 100 })
      .then((res) => {
        console.log("Danh mục lấy về:", res.data.data.docs);
        setCategories(res.data.data.docs);
      })
      .catch((error) => {
        console.log("Lỗi lấy danh mục:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;
    if (type === "checkbox") {
      newValue = checked;
    } else if (name === "is_stock") {
      newValue = value;
    } else {
      newValue = value;
    }

    console.log(`Thay đổi: ${name} = ${newValue}`);
    setFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Ảnh đã chọn:", file);
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("price", formValues.price);
    formData.append("accessories", formValues.accessories);
    formData.append("promotion", formValues.promotion);
    formData.append("status", formValues.status);
    formData.append("category_id", formValues.category_id);
    formData.append("is_stock", formValues.is_stock.toString());
    formData.append("is_featured", formValues.is_featured.toString());
    formData.append("details", formValues.details);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    // Log toàn bộ dữ liệu gửi đi (debug)
    console.log("Dữ liệu gửi lên:", Object.fromEntries(formData.entries()));

    getProductsAdd(formData)
      .then((res) => {
        console.log("Phản hồi API khi thêm:", res);
        alert("Thêm sản phẩm thành công!");
        navigate("/products");
      })
      .catch((err) => {
        console.error("Lỗi khi thêm sản phẩm:", err);
        alert("Thêm sản phẩm thất bại!");
      });
  };

  const handleReset = () => {
    console.log("Reset form");
    setFormValues({
      name: "",
      price: "",
      accessories: "",
      promotion: "",
      status: "",
      category_id: "",
      is_stock: true,
      is_featured: true,
      details: "",
    });
    setSelectedImage(null);
    setPreviewImage(null);
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
            <a href="#">Quản lý sản phẩm</a>
          </li>
          <li className="active">Thêm sản phẩm</li>
        </ol>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Thêm sản phẩm</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Tên sản phẩm</label>
                    <input
                      required
                      name="name"
                      className="form-control"
                      value={formValues.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Giá sản phẩm</label>
                    <input
                      required
                      name="price"
                      type="number"
                      min={0}
                      className="form-control"
                      value={formValues.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phụ kiện</label>
                    <input
                      required
                      name="accessories"
                      className="form-control"
                      value={formValues.accessories}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Khuyến mãi</label>
                    <input
                      required
                      name="promotion"
                      className="form-control"
                      value={formValues.promotion}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Tình trạng</label>
                    <input
                      required
                      name="status"
                      className="form-control"
                      value={formValues.status}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Ảnh sản phẩm</label>
                    <input
                      required
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{ width: "150px", marginTop: "10px" }}
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label>Danh mục</label>
                    <select
                      required
                      name="category_id"
                      className="form-control"
                      value={formValues.category_id}
                      onChange={handleChange}
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {categories.map((cate) => (
                        <option key={cate._id} value={cate._id}>
                          {cate.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                      name="is_stock"
                      className="form-control"
                      value={formValues.is_stock.toString()} // ✅ ép kiểu thành chuỗi để khớp với <option>
                      onChange={handleChange}
                    >
                      <option value="true">Còn hàng</option>
                      <option value="false">Hết hàng</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Sản phẩm nổi bật</label>
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          name="is_featured"
                          checked={formValues.is_featured}
                          onChange={handleChange}
                          value="on"
                        />{" "}
                        Nổi bật
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Mô tả sản phẩm</label>
                    <textarea
                      required
                      name="details"
                      className="form-control"
                      rows={3}
                      value={formValues.details}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-success">
                    Thêm mới
                  </button>
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={handleReset}
                  >
                    Làm mới
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
