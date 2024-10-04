import React, { useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useOrderDetailsQuery } from '../../redux/api/orderApi';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader';
import { colorMap } from '../../constants/constants';

const OrderDetails = () => {

  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const { shippingInfo, orderItems, paymentInfo, user, totalAnount, orderStatus } = order;

  const isPaid = paymentInfo?.status === "Đã thanh toán" ? true : false;

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />

  return (
    <>
      <MetaData title = {"Chi tiết đơn hàng"} />
      <div className="row d-flex justify-content-center">
      <div className="col-12 col-lg-9 mt-5 order-details">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mt-5 mb-4">Chi tiết đơn hàng</h3>
          <Link to = {`/invoice/orders/${order?._id}`} className = "btn btn-success">
            <i className = "fa fa-print" ></i>Hóa đơn
          </Link>
        </div>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Mã đơn hàng</th>
              <td>{order?._id}</td>
            </tr>
            <tr>
              <th scope="row">Trạng thái đơn hàng</th>
              <td className={String(orderStatus).includes("Deliverd") ? "greenColor" : "redColor"}>
                <b>{orderStatus}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Ngày đặt hàng</th>
              <td>{new Date(order?.createdAt).toLocaleString("vi-VN")}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Thông tin nhận hàng</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Tên người nhận</th>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th scope="row">Điện thoại liên hệ</th>
              <td>{shippingInfo?.phoneNo}</td>
            </tr>
            <tr>
              <th scope="row">Đỉa chỉ giao hàng</th>
              <td>{shippingInfo?.address}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Thông tin thanh toán</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Tình trạng thanh toán</th>
              <td className={isPaid ? "greenColor" : "redColor"}>
                <b>{order?.paymentInfo?.status}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Hình thức thanh toán</th>
              <td>{order?.paymentMethod}</td>
            </tr>
            <tr>
              <th scope="row">Mã thanh toán Tín dụng</th>
              <td>{order?.paymentInfo?.id || "Không có"}</td>
            </tr>
            <tr>
              <th scope="row">Số tiền thanh toán</th>
              <td>{order?.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 my-4">Sản phẩm trong đơn hàng:</h3>

        <hr />
        <div className="cart-item my-1">
          {orderItems?.map((item) => (
            <div className="row my-5">
            <div className="col-4 col-lg-2">
              <img
                src={item?.image}
                alt={item?.name}
                height="100"
                width="100"
              />
            </div>

            <div className="col-5 col-lg-5">
              <Link to={`/product/${item?.product}`}>{item?.name}</Link>
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

            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
              <p>{item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>

            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
              <p>{item?.quantity} x {item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} = <b>{(item?.quantity * item?.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b></p>
            </div>
          </div>
          ))}

        </div>
        <hr />
      </div>
    </div>

    </>
  )
}

export default OrderDetails