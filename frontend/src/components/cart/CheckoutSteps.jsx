import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({shipping, confirmOrder, payment}) => {
  return (
    <>
      <div className="checkout-progress d-flex justify-content-center mt-5 row">
        {shipping ? (
          <Link
            to="/shipping"
            className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
          >
            <div className="triangle2-active"></div>
            <div className="step active-step">Vận chuyển</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link
            to="#!"
            className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
            disabled
          >
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Vận chuyển</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {confirmOrder? (
          <Link
            to="/confirm_order"
            className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
          >
            <div className="triangle2-active"></div>
            <div className="step active-step">Đơn hàng</div>
            <div className="triangle-active"></div>
          </Link>                   
        ) : (
          <Link
            to="#!"
            className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
            disabled
          >
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Đơn hàng</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {payment? (
          <Link
            to="/payment_method"
            className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
          >
            <div className="triangle2-active"></div>
            <div className="step active-step">Thanh toán</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link
            to="#!"
            className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
            disabled
          >
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Thanh toán</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

      </div>


    </>
  )
}

export default CheckoutSteps