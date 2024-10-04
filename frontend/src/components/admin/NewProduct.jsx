import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/productsApi";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_SUBCATEGORIES,
  PRODUCT_SUBSUBCATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
} from "../../constants/constants";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const initialProductState = () => ({
  productID: "",
  name: "",
  description: "",
  origin: "",
  price: "",
  category: {
    name: "",
    subCategory: "",
    subSubCategory: "",
  },
  color: [],
  size: [],
  stock: "",
  
}); // ulitize code 2 places in component

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialProductState);
  const [tempProductID, setTempProductID] = useState("");

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
      // navigate("/admin/products");
    }

    if (isSuccess) {
      // toast.success("Sản phẩm đã được tạo");
      // navigate("/admin/products");
      console.log("productID", product.productID);
      confirmAlert({
        title: "Thành công",
        message: "Tạo sản phẩm mới thành công. Bạn có muốn chuyển hướng trang quản lý sản phẩm?",
        buttons: [
          {
            label: "Có",
            onClick: () => navigate(`/admin/products?productId=${tempProductID}`)
          },
          {
            label: "Không",
            onClick: () => setProduct(initialProductState)
          }
        ]
      })
    }
  }, [error, isSuccess]);

  const { productID, name, description, origin, price, category, variants, visible } =
    product;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProduct({ ...product, [name]: checked });
    } else if (name === "color" || name === "size") {
      const values = Array.from(e.target.selectedOptions, (option) => option.value);
      setProduct({ ...product, [name]: values });
    } else if (name.includes("category")) {
      const categoryField = name.split(".")[1];
      setProduct({
        ...product,
        category: { ...product.category, [categoryField]: value },
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const hasDuplicate = (array) => {
    const set = new Set(array);
    return set.size !== array.length;
  };

  const addColor = () => {
    const newColors = [...product.color, ""];
    if (!hasDuplicate(newColors)) {
      setProduct({ ...product, color: [...product.color, ""] });
    } else {
      alert("Màu sắc đã tồn tại!")
    }
  };
  
  const removeColor = (index) => {
    const newColors = product.color.filter((_, colorIndex) => colorIndex !== index);
    setProduct({ ...product, color: newColors });
  };
  
  const addSize = () => {
    const newSizes = [...product.size, ""];
    if (!hasDuplicate(newSizes)) {
      setProduct({ ...product, size: [...product.size, ""] });
    } else {
      alert("Kích cỡ đã tồn tại!")
    }
  };
  
  const removeSize = (index) => {
    const newSizes = product.size.filter((_, sizeIndex) => sizeIndex !== index);
    setProduct({ ...product, size: newSizes });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setTempProductID(product.productID);
    createProduct(product);
  };

  return (
    <AdminLayout>
      <MetaData title={"Tạo Sản phẩm mới"} />
      <div className="row wrapper">
        <div className="col-11 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Sản phẩm mới</h2>
            <div className="row">
              <div className="mb-3 col-12 col-md-3">
                <label htmlFor="productID_field" className="form-label">
                  Mã ID
                </label>
                <input
                  type="text"
                  id="productID_field"
                  className="form-control"
                  name="productID"
                  value={productID}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col-12 col-md-9">
                <label htmlFor="name_field" className="form-label">
                  {" "}
                  Tên{" "}
                </label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">
                Mô tả
              </label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                name="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="row">
              <div className="m b-3 col-12 col-md-6">
                <label htmlFor="origin_field" className="form-label">
                  {" "}
                  Nguồn gốc{" "}
                </label>
                <input
                  type="text"
                  id="origin_field"
                  className="form-control"
                  name="origin"
                  value={origin}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3 col-12 col-md-6">
                <label htmlFor="price_field" className="form-label">
                  {" "}
                  Giá (VNĐ){" "}
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-md-4">
                <label htmlFor="category_field" className="form-label">
                  {" "}
                  Danh mục{" "}
                </label>
                <select
                  className="form-select"
                  id="category_field"
                  name="category.name"
                  value={category.name}
                  onChange={onChange}
                >
                  <option value="">Chọn danh mục</option>
                  {PRODUCT_CATEGORIES?.map((categoryName) => (
                    <option key={categoryName} value={categoryName}>
                      {categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* SubCategory Selection */}
              <div className="mb-3 col-12 col-md-4">
                <label htmlFor="subCategory_field" className="form-label">
                  Danh mục phụ L2
                </label>
                <select
                  className="form-select"
                  id="subCategory_field"
                  name="category.subCategory"
                  value={category.subCategory}
                  onChange={onChange}
                  disabled={!category.name}
                >
                  <option value="">Vui lòng chọn</option>
                  {category.name &&
                    PRODUCT_SUBCATEGORIES[category.name].map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                </select>
              </div>

              {/*  SubSubCategory Selection */}
              <div className="mb-3 col-12 col-md-4">
                <label htmlFor="subSubCategory_field" className="form-label">
                  Danh mục phụ L3
                </label>
                <select
                  className="form-select"
                  id="subSubCategory_field"
                  name="category.subSubCategory"
                  value={category.subSubCategory}
                  onChange={onChange}
                  disabled={!category.subCategory}
                >
                  <option value="">Vui lòng chọn</option>
                  {category.subCategory &&
                    PRODUCT_SUBSUBCATEGORIES[category.subCategory].map(
                      (subSubCategory) => (
                        <option key={subSubCategory} value={subSubCategory}>
                          {subSubCategory}
                        </option>
                      )
                    )}
                </select>
              </div>
            </div>

            {/* Variants form fields */}
            <div className="row">
              <div className="mt-1 mb-2 col-8 col-md-4">
                <label htmlFor="color_field" className="form-label">
                  Màu sắc
                </label>
                {product.color.map((color, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <select
                      id={`color_field_${index}`}
                      className="form-control"
                      name="color"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...product.color];
                        newColors[index] = e.target.value;
                        setProduct({ ...product, color: newColors });
                      }}
                      title="Các màu sắc được chấp nhận: Trắng, Đen, Đỏ, Xanh, Vàng, Hồng, Cam, Xám, Nâu, Sọc, Họa tiết"
                    >
                      <option value="">Trống</option>
                      {PRODUCT_COLORS.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => removeColor(index)}
                    >
                      Xoá
                    </button>
                  </div>
                ))}
                <br/>
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={addColor}
                >
                  Thêm màu sắc
                </button>
              </div>

              <div className="mt-1 mb-2 col-4 col-md-4">
                <label htmlFor="size_field" className="form-label">
                  Size
                </label>
                {product.size.map((size, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <select
                      id={`size_field_${index}`}
                      className="form-control"
                      name="size"
                      value={size}
                      onChange={(e) => {
                        const newSizes = [...product.size];
                        newSizes[index] = e.target.value;
                        setProduct({ ...product, size: newSizes });
                      }}
                      title="Các kích cỡ được chấp nhận: S, M, L, F"
                    >
                      <option value="">Trống</option>
                      {PRODUCT_SIZES.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => removeSize(index)}
                    >
                      Xoá
                    </button>
                  </div>
                ))}
                <br/>
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={addSize}
                >
                  Thêm kích cỡ
                </button>
              </div>

              <div className="mt-1 mb-2 col">
                <label htmlFor="stock_field" className="form-label">
                  Tồn kho
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  value={product.stock}
                  onChange={onChange}
                  min="0"
                />
              </div>
            </div>
            

            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Đang tạo..." : "TẠO"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
