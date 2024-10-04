import React from 'react'
import MetaData from '../layout/MetaData'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { calculateOrderCost } from '../../helpers/helpers';
import CheckoutSteps from './CheckoutSteps';
import { colorMap } from '../../constants/constants';

const ConfirmOrder = () => {

  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, totalPrice } = calculateOrderCost(cartItems);
  
  return (   
    <>
      <MetaData title = {"Xác nhận giao dịch"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Thông tin vận chuyển</h4>
          <p><b>Người nhận: </b>{user?.name}</p>
          <p className="mb-4">
            <b>Địa chỉ: </b> {shippingInfo?.address}
          </p>
          <p><b>Điện thoại liên hệ: </b>{shippingInfo?.phoneNo}</p>

          <hr />
          <h4 className="mt-4">Chi tiết sản phẩm:</h4>
          {cartItems?.map((item) => (
            <>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item?.image}
                      alt="FashionShop"
                      height="65"
                      width="80"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item?.name}</Link>
                    <div>
                      <button
                        key={item?.selectedColor}
                        style={{ backgroundColor: colorMap[item?.selectedColor] }}
                        className={"color-button active"}
                        disabled={true}
                      >
                      {item?.selectedColor}
                      </button>
                      <button 
                      key={item?.selectedSize}
                      className={"size-button selected"}
                      disabled={true}
                      >
                      {item?.selectedSize}
                      </button>
                    </div>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>{item?.quantity} x {item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} = <b>{(item?.quantity * item?.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b></p>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}

        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Thông tin giỏ hàng</h4>
            <hr />
            <p>Tổng tiền hàng: <span className="order-summary-values">{itemsPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
            <p>Phí vận chuyển: <span className="order-summary-values">{shippingPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>

            <hr />

            <p>Tổng cộng: <span className="order-summary-values">{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>

            <hr />
            <Link to="/payment_method" id="checkout_btn" className="btn btn-primary w-100">
              Thanh toán
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOrder