import React, {useEffect, useState} from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { calculateOrderCost } from '../../helpers/helpers'
import { useCreateNewOrderMutation } from '../../redux/api/orderApi'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

const PaymentMethod = () => {
  
  const [method, setMethod] = useState("")

  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [createNewOrder, {isLoading, error, isSuccess}] = useCreateNewOrderMutation();

  useEffect(() => {    
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
    if (isLoading){
      toast.warn("Đang tạo đơn hàng trên hệ thống");
    }
  }, [error, isSuccess]);

  
  const submitHandler = (e) => {

    //Ko cho phép để trống hình thức thanh toán
    e.preventDefault();    
    if (method === ""){
      toast.error("Bạn phải chọn hình thức thanh toán");
    }

    const { itemsPrice, shippingPrice, totalPrice } = calculateOrderCost(cartItems);

    if (method === "COD"){
      //alert("COD");

      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice, 
        shippingAmount: shippingPrice, 
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Chưa thanh toán"
        },
        paymentMethod: "COD",
      };


      createNewOrder(orderData)
    }

    if (method === "Card"){
      alert("Hình thức này đang được xây dựng");

    }
  }


  return (
    <>
      <MetaData title={"Hình thức thanh toán"} />

      <CheckoutSteps shipping confirmOrder payment/>

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Chọn hình thức thanh toán</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod("COD")}
              />
              <label className="form-check-label" htmlFor="codradio">
                Thanh toán khi nhận hàng
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod("Card")}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Thanh toán bằng thẻ ghi nợ/thẻ tín dụng
              </label>
            </div>

            <button id="shipping_btn" type="submit" className="btn py-2 w-100">
              TIẾP TỤC THANH TOÁN
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PaymentMethod