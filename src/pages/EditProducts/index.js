import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductsById,
  getCategories,
  getProductsUpdt,
} from "../../services/Api";
import { getImageProduct } from "../../shared/ultils";

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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
    getCategories()
      .then((res) => setCategories(res.data.data.docs))
      .catch((err) => console.error("Lỗi tải danh mục:", err));

    getProductsById(id)
      .then((res) => {
        const data = res.data.data;
        setFormValues({
          name: data.name || "",
          price: data.price || 0,
          accessories: data.accessories || "",
          promotion: data.promotion || "",
          status: data.status || "",
          category_id: data.category_id || "",
          is_stock: data.is_stock ?? true,
          is_featured: data.is_featured ?? true,
          details: data.details || "",
        });
        setImagePreview(data.image ? getImageProduct(data.image) : "");
      })
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", formValues.name);
      formData.append("price", Number(formValues.price));
      formData.append("accessories", formValues.accessories);
      formData.append("promotion", formValues.promotion);
      formData.append("status", formValues.status);
      formData.append("category_id", formValues.category_id);
      formData.append("is_stock", formValues.is_stock); // boolean
      formData.append("is_featured", formValues.is_featured); // boolean
      formData.append("details", formValues.details);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      // Log dữ liệu để kiểm tra
      console.log("📝 Dữ liệu gửi đi:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      await getProductsUpdt(id, formData);
      alert("✅ Cập nhật thành công!");
      navigate("/products");
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      alert("❌ Cập nhật thất bại!");
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
            <a href="#">Quản lý sản phẩm</a>
          </li>
          <li className="active">{formValues.name}</li>
        </ol>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Sản phẩm: {formValues.name}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                required
                className="form-control"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Giá sản phẩm</label>
              <input
                type="number"
                name="price"
                required
                className="form-control"
                value={formValues.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phụ kiện</label>
              <input
                type="text"
                name="accessories"
                required
                className="form-control"
                value={formValues.accessories}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Khuyến mãi</label>
              <input
                type="text"
                name="promotion"
                required
                className="form-control"
                value={formValues.promotion}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Tình trạng</label>
              <input
                type="text"
                name="status"
                required
                className="form-control"
                value={formValues.status}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Ảnh sản phẩm</label>
              <input type="file" name="image" onChange={handleImageChange} />
              <br />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" width={120} />
              )}
            </div>

            <div className="form-group">
              <label>Danh mục</label>
              <select
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
              <label>Còn hàng</label>
              <div className="checkbox">
                <label>
                  <input
                    name="is_stock"
                    type="checkbox"
                    checked={formValues.is_stock}
                    onChange={handleChange}
                  />{" "}
                  Còn hàng
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Sản phẩm nổi bật</label>
              <div className="checkbox">
                <label>
                  <input
                    name="is_featured"
                    type="checkbox"
                    checked={formValues.is_featured}
                    onChange={handleChange}
                  />{" "}
                  Nổi bật
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Mô tả sản phẩm</label>
              <textarea
                name="details"
                className="form-control"
                rows={3}
                value={formValues.details}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
            <button
              type="reset"
              className="btn btn-default"
              onClick={() => window.location.reload()}
            >
              Làm mới
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProducts;
