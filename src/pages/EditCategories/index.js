import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductsById,
  getCategories,
  getProductsUpdt,
} from "../../services/Api";

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
    const fetchData = async () => {
      try {
        const cateRes = await getCategories();
        setCategories(cateRes.data.data.docs);

        const productRes = await getProductsById(id);
        const data = productRes.data.data;

        setFormValues({
          name: data.name || "",
          price: data.price || 0,
          accessories: data.accessories || "",
          promotion: data.promotion || "",
          status: data.status || "",
          category_id: data.category._id || "", // Nếu category là object
          is_stock: data.is_stock,
          is_featured: data.is_featured,
          details: data.details || "",
        });

        setImagePreview(`/uploads/images/${data.image}`);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
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
      for (const key in formValues) {
        formData.append(key, formValues[key]);
      }

      if (selectedImage) {
        formData.append("prd_image", selectedImage); // Key đúng với API
      }

      await getProductsUpdt(id, formData);
      alert("Cập nhật sản phẩm thành công!");
      navigate("products"); // Cập nhật đúng đường dẫn nếu là trang admin
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Đã xảy ra lỗi khi cập nhật sản phẩm.");
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
                type="file"
                name="prd_image"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" width={120} />
              )}
            </div>

            <div className="form-group">
              <label>Danh mục</label>
              <select
                name="category_id"
                className="form-control"
                value={formValues.category}
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
              type="button"
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
