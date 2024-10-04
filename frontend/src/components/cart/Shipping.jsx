import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { saveShippingInfo } from "../../redux/features/cartSlice";
import CheckoutSteps from './CheckoutSteps';

const Shipping = () => {

  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [orderID, setOrderID] = useState(user?._id + Date.now()); //Tạo orderID trong shipping là ID người dùng+timestamp

  /*Điện sẵn thông tin từ shippingInfo nếu đã có trên local strorage của kh.
  Nếu chưa có thì dùng thông tin mặc định từ tài khoản*/
  const [address, setAddress] = useState(shippingInfo?.address || user?.address);
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || user?.phone);


  //Nếu chưa có shippingInfo trên local db thì tạo với thông số mặc định
  // if(shippingInfo.length === 0){
  //   setAddress(user?.address);
  //   setPhoneNo(user?.phoneNo);
  //   dispatch(saveShippingInfo({orderID, address: user?.address, phoneNo: user?.phone }));
  // }


  //Hook để render lại khi sửa thông tin vận chuyển
  // useEffect(() => {
  //   if (shippingInfo) {
  //     setAddress(shippingInfo?.address);
  //     setPhoneNo(shippingInfo?.phoneNo);
  //   }
  // }, [shippingInfo]);

  const submitHanler = (e) => {
    //e.preventDefault(); //cho phép dùng giá trị mặc định trên các trường thông tin
    //Lưu lại shippingInfo với thông số mặc định hoặc thay đổi (nếu có) khi chọn xác nhận thông tin
    dispatch(saveShippingInfo({orderID, address, phoneNo}));    
    navigate("/confirm_order");
  };

  return (
    <>
      <MetaData title = {"Thông tin vận chuyển"} />

      <CheckoutSteps shipping />
      
      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"

            onSubmit={submitHanler}
          >
            <h2 className="mb-4">Thông tin vận chuyển</h2>
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">Địa chỉ</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">Điện thoại liên hệ</label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              Tiếp tục Đặt hàng
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping