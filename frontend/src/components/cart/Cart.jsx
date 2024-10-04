import React, { useState } from "react";
import MetaData from "../layout/MetaData"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";
import { colorMap } from "../../constants/constants";
//import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { toast } from "react-toastify";

const Cart =() => {
  const dispatch = useDispatch();

  const {cartItems} = useSelector((state) => state.cart);

  const navigate = useNavigate();
  
  //Xử lý khi thay đổi color
  const handleColorChange = (item, color) => {
    const newColor = color;
    setItemToCart(item, item.quantity, newColor, item?.selectedSize)
  }

  //Xử lý khi thay đổi size
  const handleSizeClick = (item, size) => {
    const newSize = size;
    setItemToCart(item, item.quantity, item?.selectedColor, newSize)
  };

  //Xử lý khi chọn tăng số lượng
  const increseQty = (item, quantity) => {
    const newQty = quantity + 1

    if (newQty >= item?.stock)
      return;
    setItemToCart(item, newQty, item?.selectedColor, item?.selectedSize);
  };

  //Xử lý khi chọn giảm số lượng
  const decreseQty = (item, quantity) => {
    const newQty = quantity -1

    if (newQty <= 0)
      return;
    setItemToCart(item, newQty, item?.selectedColor, item?.selectedSize);
  };

  //Hàm set thông tin mặt hàng trong giỏ
  const setItemToCart = (item, newQty, newSelColor, newSelSize) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      color: item?.color, //list các màu của sản phẩm
      size: item?.size, //list các size của sản phẩm
      selectedColor: newSelColor, // color: màu sắc đã chọn cho sản phẩm
      selectedSize: newSelSize, // size: kích cỡ đã chọn cho sản phẩm
      quantity: newQty
    };

    dispatch(setCartItem(cartItem));
    toast.success("sửa thành công");

    console.log(cartItem);
  };

  //Hàm xử lý khi xóa sản phẩm trong giỏ
  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  //Hàm xử lý khi chuyển sang kiểm tra vận chuyển
  const checkoutHandler = () => {
    navigate("/shipping");
  };


  return (
    <>
      <MetaData title={"Giỏ Hàng"} />
      {cartItems?.length === 0 ? (
        <h2 className="mt-5">Quý khách chưa chọn mặt hàng nào</h2>
      ) : (
        <>
        <h2 className="mt-5">Mặt hàng trong giỏ: <b>{cartItems?.length} mặt hàng</b></h2>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems?.map((item) => (
              <>
              <hr />
              <div className="cart-item" data-key="product1">
                <div className="row">
                  <div className="col-4 col-lg-3">
                    <img
                      src={item?.image}
                      alt="FashionShop"
                      height="180"
                      width="100"
                    />
                  </div>

                  <div className="col-5 col-lg-3">
                    <Link to={`/product/${item?.product}`}> {item?.name} </Link>
                    <p>Màu sắc:
                      <div className="color-chooser">
                        {item?.color.map((colorName) => (
                          <button
                            key={colorName}
                            style={{ backgroundColor: colorMap[colorName] }}
                            className={`color-button ${item?.selectedColor === colorName ? 'active' : ''}`}
                            onClick={() => handleColorChange(item, colorName)}
                          >
                            {colorName}
                          </button>
                        ))}
                      </div>
                    </p>

                    <p>Sizes: 
                    <div className="size-buttons">
                      {item?.size.map((size, index) => (
                        <button 
                          key={index} 
                          onClick={() => handleSizeClick(item, size)}
                          // Cập nhật trạng thái khi size button được nhấn, sau đó thêm class selected vào button khi render lại component
                          className={`size-button ${item?.selectedSize === size ? 'selected' : ''}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </p>
                  </div>

                  

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price">{item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                      {/*Thêm onClick và hàm giảm số lượng trong giỏ ở đây */}
                      <span className="btn btn-danger minus" onClick={() => decreseQty(item, item.quantity)}> - </span>
                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={item?.quantity}
                        readonly
                      />
                      {/*Thêm onClick và hàm tăng số lượng trong giỏ ở đây */}
                      <span className="btn btn-primary plus" onClick={() => increseQty(item, item.quantity)}> + </span>
                    </div>
                  </div>
                  <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                    {/*Thêm onClick và hàm xử lý khi xóa sản phẩm trong giỏ ở đây */}
                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item?.product)}></i>
                  </div>
                </div>
              </div>
              <hr />
              </>
            ))}

          </div>
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Thông tin thanh toán</h4>
              <hr />
              {
              /*Xử lý thông tin số lượng trong giỏ hàng tại đây */}
              <p>Số lượng sản phẩm: <span className="order-summary-values"> {cartItems?.reduce((acc,item) => acc + item?.quantity, 0)} </span></p>
              {/*Xử lý thông tin thanh toán giỏ hàng tịa đây */}
              <p>Tổng tiền tạm tính: <span className="order-summary-values">{cartItems?.reduce((acc,item) => acc + item?.quantity * item.price, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
              <hr />
              {/*Thêm onClick và hàm xử lý khi chuyển sang trang thanh toán ở đây */ }
              <button id="checkout_btn" className="btn btn-primary w-100" onClick={checkoutHandler}>
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
        </>
      )}
      
    </>
  );
};

export default Cart