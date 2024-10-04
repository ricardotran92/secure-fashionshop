import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
import AdminLayout from "../layout/AdminLayout";

import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import PhoneInput from "react-phone-input-2";

//PENDING: cập nhật trạng thái thanh toán của đơn COD-> từ đó cập nhật trạng thái giao hàng của đơn
const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const params = useParams();

  const { data } = useOrderDetailsQuery(params?.id);

  const order = data?.order || {};

  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation();

  const { orderItems, paymentInfo } = order;

  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  // console.log(orderStatus)

  //const { orderItems, orderStatus} = order;

  //const [orderStatus, setOrderStatus] = useState(x);

  //console.log("od stt", orderStatus)

  //const [paymentStatus, setPaymentStatus] = useState(data?.order?.paymentInfo?.status);
  //console.log(paymentStatus)
  //const isPaid = order?.paymentInfo?.status === "Đã thanh toán" ? true : false;

  useEffect(() => {
    if (order) setOrderStatus(order.orderStatus);
  }, [order]);

  useEffect(() => {
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (paymentInfo) setPaymentStatus(paymentInfo?.status);
  }, [paymentInfo]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      setOrderStatus(status);
      if (status === "Delivered") setPaymentStatus("Đã thanh toán");
      toast.success("Cập nhật đơn hàng thành công");
    }
  }, [error, isSuccess]);

  const updateOrderHandler = (id) => {
    const preSt = status;
    const dataUpdate = { status };
    //updateOrder({id, body: dataUpdate})
    updateOrder({ id, body: dataUpdate }).then(() => {
      //setOrderStatus(preSt);
      // if (status === "Delivered")
      //   setPaymentStatus("Đã thanh toán")
      //   //setPaymentStatus(data?.order?.paymentInfo?.status);
    });
  };

  return (
    <AdminLayout>
      <MetaData title={"Quản lý chi tiết đơn hàng"} />

      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-7 my-5">
          <section id="order_summary" className="shadow rounded bg-body">
            <MDBContainer className="py-1 h-100">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol md="12">
                  <MDBCardHeader className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-0 text-black"
                      >
                        Thông tin thanh toán
                      </MDBTypography>
                    </div>
                  </MDBCardHeader>

                  <MDBCardBody className="mb-4">
                    <MDBCard className="rounded-3 mb-4">
                      <MDBCardBody className="p-4">
                        <MDBRow className="justify-content-between align-items-center">
                          <form>
                            <div className="row">
                              <div className="col-12 col-md-4 mb-3">
                                <div className="form-outline">
                                  <label
                                    className="form-label fw-bold text-black"
                                    for="form6Example1"
                                  >
                                    Người nhận
                                  </label>
                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#f8f9fa",
                                    }}
                                    type="text"
                                    id="form6Example1"
                                    className="form-control"
                                    value={order?.user?.name}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-4 mb-3">
                                <div className="form-outline">
                                  <label
                                    className="form-label fw-bold text-black"
                                    for="form6Example2"
                                  >
                                    Điện thoại
                                  </label>
                                  <PhoneInput
                                    inputStyle={{
                                      width: "100%",
                                      height: "38px",
                                      fontSize: "16px",
                                      border: "1px solid #ccc",
                                      borderRadius: "5px",
                                      backgroundColor: "#f8f9fa",
                                    }}
                                    country={"vn"}
                                    countryCodeEditable={true}
                                    value={order?.shippingInfo?.phoneNo}
                                    disabled={true}
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-4 mb-3">
                                <div className="form-outline">
                                  <label
                                    className="form-label fw-bold text-black"
                                    for="form6Example2"
                                  >
                                    Email
                                  </label>

                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#f8f9fa",
                                    }}
                                    type="text"
                                    id="form6Example2"
                                    className="form-control"
                                    value={order?.user?.email}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-12 col-md-6 mb-3">
                                <div className="form-outline">
                                  <label
                                    className="form-label fw-bold text-black"
                                    for="form6Example1"
                                  >
                                    Đơn vị vận chuyển
                                  </label>
                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#f8f9fa",
                                    }}
                                    type="text"
                                    id="form6Example1"
                                    className="form-control"
                                    value={order?.shippingInfo?.shippingVender}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6 mb-3">
                                <div className="form-outline">
                                  <label
                                    className="form-label fw-bold text-black"
                                    for="form6Example2"
                                  >
                                    Hình thức thanh toán
                                  </label>
                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#f8f9fa",
                                      color: "#CC0000",
                                    }}
                                    type="text"
                                    id="form6Example2"
                                    className="form-control fw-bold"
                                    value={
                                      order?.paymentMethod
                                        ? order?.paymentMethod === "Card"
                                          ? `${
                                              order?.paymentMethod
                                            } - ${order?.shippingInfo?.orderID.toUpperCase()}`
                                          : "COD"
                                        : ""
                                    }
                                    disabled={true}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="form-outline mb-3">
                              <label
                                className="form-label fw-bold text-black"
                                for="form6Example3"
                              >
                                Địa chỉ
                              </label>
                              <input
                                style={{
                                  width: "100%",
                                  backgroundColor: "#f8f9fa",
                                }}
                                type="text"
                                id="form6Example3"
                                className="form-control"
                                // value={order?.shippingInfo?.address}
                                value={[
                                  order?.shippingInfo?.address,
                                  order?.shippingInfo?.shippingWard,
                                  order?.shippingInfo?.shippingCity,
                                  order?.shippingInfo?.shippingProvince,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                                disabled={true}
                              />
                            </div>
                            <div className="row">
                              <div className="col-12 col-md-4 mb-3">
                                <div className="form-outline">
                                  <label
                                    className="form-label fw-bold text-black"
                                    for="form6Example1"
                                  >
                                    Phường/Xã
                                  </label>
                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#f8f9fa",
                                    }}
                                    type="text"
                                    id="form6Example1"
                                    className="form-control"
                                    value={order?.shippingInfo?.shippingWard}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-4 mb-3">
                                <div className="form-outline">
                                  <label
                                    className="form-label fw-bold text-black"
                                    for="form6Example2"
                                  >
                                    Quận/Huyện
                                  </label>
                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#f8f9fa",
                                    }}
                                    type="text"
                                    id="form6Example1"
                                    className="form-control"
                                    value={order?.shippingInfo?.shippingCity}
                                    disabled={true}
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-4 mb-3">
                                <div className="form-outline">
                                  <label
                                    className="form-label fw-bold text-black"
                                    for="form6Example2"
                                  >
                                    Tỉnh/Thành Phố
                                  </label>
                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#f8f9fa",
                                    }}
                                    type="text"
                                    id="form6Example1"
                                    className="form-control"
                                    value={order?.shippingInfo?.shippingProvince}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 col-md-6 mb-3">
                                <div className="form-outline">
                                  <label
                                    className="form-label fw-bold text-black"
                                    for="form6Example1"
                                  >
                                    Mã đơn hàng
                                  </label>
                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#f8f9fa",
                                    }}
                                    type="text"
                                    id="form6Example1"
                                    className="form-control fw-bold"
                                    value={order?.shippingInfo?.orderID.toUpperCase()}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6 mb-3">
                                <div className="form-outline">
                                  <label
                                    className="form-label fw-bold text-black"
                                    for="form6Example2"
                                  >
                                    Trạng thái đơn hàng
                                  </label>
                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#f8f9fa",
                                      color: String(
                                        order?.orderStatus
                                      ).includes("Delivered")
                                        ? "green"
                                        : String(orderStatus).includes(
                                            "Shipped"
                                          )
                                        ? "#FFCC00"
                                        : "#CC0000",
                                    }}
                                    className={`form-control fw-bold ${
                                      orderStatus === "Delivered"
                                        ? "greenColor"
                                        : orderStatus === "Shipped"
                                        ? "yellowColor"
                                        : "redColor"
                                    }`}
                                    // className="form-control fw-bold"
                                    type="text"
                                    id="form6Example2"
                                    value={orderStatus}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>

              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol md="12">
                  <MDBCardHeader className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-0 text-black"
                      >
                        Thông tin sản phẩm
                      </MDBTypography>
                    </div>
                  </MDBCardHeader>

                  <MDBCardBody className="mb-4">
                    {order?.orderItems?.map((item) => (
                      <MDBCard className="rounded-3 mb-4">
                        <MDBCardBody className="p-4">
                          <MDBRow className="justify-content-between align-items-center">
                            <MDBCol md="2" lg="2" xl="2">
                              <MDBCardImage
                                className="rounded-3"
                                fluid
                                src={item?.image}
                                alt={item?.name}
                              />
                            </MDBCol>
                            <MDBCol md="4" lg="4" xl="4">
                              <div className="lead fw-bold mb-2">
                                <Link
                                  to={`/product/${item?.product}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "gray",
                                  }}
                                >
                                  {" "}
                                  {item?.name}{" "}
                                </Link>
                              </div>

                              <div
                                className="dropdown"
                                style={{ width: "max-content" }}
                              >
                                <button
                                  className="form-control"
                                  type="button"
                                  style={{
                                    textAlign: "left",
                                    backgroundColor: "#f8f9fa",
                                  }}
                                  disabled={true}
                                >
                                  {item?.selectedVariant?.color}
                                </button>
                              </div>
                              <p></p>

                              <div
                                className="dropdown"
                                style={{ width: "max-content" }}
                              >
                                <button
                                  className="form-control"
                                  type="button"
                                  style={{
                                    textAlign: "left",
                                    backgroundColor: "#f8f9fa",
                                  }}
                                  disabled={true}
                                >
                                  {item?.selectedVariant?.size}
                                </button>
                              </div>
                              <p></p>
                            </MDBCol>

                            <MDBCol
                              md="4"
                              lg="4"
                              xl="4"
                              className="offset-lg-1 d-inline align-items-center justify-content-around"
                            >
                              <MDBTypography tag="h5" className="mb-0 text-end">
                                <p id="card_item_price" className="">
                                  {item?.quantity} x{" "}
                                  {item?.price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}{" "}
                                  ={" "}
                                  <b style={{ color: "#CC0000" }}>
                                    {(
                                      item?.quantity * item?.price
                                    ).toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </b>
                                </p>
                              </MDBTypography>

                              {/* <button
                                id="review_btn"
                                type="button"
                                className="btn btn-primary mt-4 w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#ratingModal"
                                value={
                                  item?.orderItems?.selectedVariant?.variantID
                                }
                                onClick={(e) => {
                                  openReview(e.target.value);
                                }}
                              >
                                Đánh giá sản phẩm
                              </button>
                              <NewReview /> */}
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    ))}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </div>

        <div className="col-12 col-lg-4 my-5">
          <section
            id="order_summary"
            className="shadow rounded "
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <MDBContainer className="py-1 h-100 ">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol md="12">
                  <MDBCardHeader className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-0 text-black bold"
                      >
                        Thông tin hóa đơn
                      </MDBTypography>
                    </div>
                  </MDBCardHeader>
                  <hr className="my-4" />
                  <MDBCardBody className="mb-4">
                    {/* <MDBRow className="justify-content-between align-items-center mb-4">
                      <MDBCol>
                        <MDBTypography tag="h4" className="mb-0">
                          Số lượng:
                        </MDBTypography>
                      </MDBCol>

                      <MDBCol>
                        <MDBTypography tag="h5" className="mb-0">
                          <span className="order-summary-values">
                            {cartItems?.reduce(
                              (acc, item) => acc + item?.quantity,
                              0
                            )}
                          </span>
                        </MDBTypography>
                      </MDBCol>
                    </MDBRow> */}

                    <MDBRow className="justify-content-between align-items-center mb-4">
                      <MDBCol>
                        <MDBTypography tag="h4" className="mb-0">
                          Tiền hàng:
                        </MDBTypography>
                      </MDBCol>

                      <MDBCol>
                        <MDBTypography tag="h5" className="mb-0">
                          <span className="order-summary-values">
                            {order &&
                              order?.itemsPrice &&
                              order?.itemsPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                          </span>
                        </MDBTypography>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="justify-content-between align-items-center mb-4">
                      <MDBCol>
                        <MDBTypography tag="h4" className="mb-0">
                          Giảm giá:
                        </MDBTypography>
                      </MDBCol>

                      <MDBCol>
                        <MDBTypography tag="h5" className="mb-0">
                          <span className="order-summary-values">0 đ</span>
                        </MDBTypography>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="justify-content-between align-items-center mb-4">
                      <MDBCol>
                        <MDBTypography tag="h4" className="mb-0">
                          Vận chuyển:
                        </MDBTypography>
                      </MDBCol>

                      <MDBCol>
                        <MDBTypography tag="h5" className="mb-0">
                          <span className="order-summary-values">
                            {order &&
                              order?.shippingAmount &&
                              order?.shippingAmount.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                          </span>
                        </MDBTypography>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>

                  <hr className="my-4" />
                  <MDBRow className="justify-content-between align-items-center mb-4">
                    <MDBCol>
                      <MDBTypography tag="h4" className="mb-0">
                        Tổng cộng:
                      </MDBTypography>
                    </MDBCol>

                    <MDBCol>
                      <MDBTypography tag="h5" className="mb-0">
                        <span
                          className="order-summary-values"
                          style={{ color: "#CC0000" }}
                        >
                          {order &&
                            order.totalAmount &&
                            order?.totalAmount.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                        </span>
                      </MDBTypography>
                    </MDBCol>
                  </MDBRow>

                  <hr className="my-4" />
                  <MDBInput
                    placeholder="NON VOUCHER"
                    wrapperClass="flex-fill"
                    size="lg"
                    style={{
                      borderRadius: "4px",
                    }}
                    disabled={true}
                  />
                  <hr className="my-4" />
                  <MDBRow className="justify-content-between align-items-center mb-4">
                    <MDBCol>
                      <MDBTypography tag="h4" className="mb-0">
                        Ngày đặt:
                      </MDBTypography>
                    </MDBCol>

                    <MDBCol>
                      <MDBTypography tag="h5" className="mb-0">
                        <span className="order-summary-values">
                          <b>
                            {new Date(order?.createdAt).toLocaleString("vi-VN")}
                          </b>
                        </span>
                      </MDBTypography>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="justify-content-between align-items-center mb-4">
                    <MDBCol>
                      <MDBTypography tag="h4" className="mb-0">
                        Tình trạng:
                      </MDBTypography>
                    </MDBCol>

                    <MDBCol>
                      <MDBTypography tag="h5" className="mb-0">
                        <span
                          className="order-summary-values"
                          style={{
                            color:
                              paymentStatus === "Đã thanh toán"
                                ? "green"
                                : "#FFCC00",
                          }}
                        >
                          <b>{order?.paymentInfo?.status}</b>
                        </span>
                      </MDBTypography>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="justify-content-center align-items-center mb-4">
                    <Link
                      to={`/invoice/orders/${order?._id}`}
                      className="btn btn-success d-flex align-items-center justify-content-center"
                      style={{
                        borderRadius: "5px",
                        height: "50px",
                        padding: "0 15px",
                      }}
                    >
                      <i
                        className="fa fa-print"
                        style={{ marginRight: "5px" }}
                      ></i>
                      Xem và in hóa đơn
                    </Link>
                  </MDBRow>
                </MDBCol>
              </MDBRow>

              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol md="12">
                  <MDBCardHeader className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-0 text-black bold"
                      >
                        Cập nhật đơn hàng
                      </MDBTypography>
                    </div>
                  </MDBCardHeader>
                  <hr className="my-4" />
                  <MDBCardBody className="mb-4">
                    <MDBRow className="justify-content-center align-items-center mb-4">
                      <MDBCol md="12">
                        <select
                          style={{
                            borderRadius: "4px",
                            height: "50px",
                          }}
                          className="form-select"
                          name="status"
                          value={status}
                          disabled={orderStatus === "Delivered"}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="justify-content-center align-items-center mb-4">
                      <button
                        style={{
                          borderRadius: "5px",
                          height: "50px",
                          padding: "0 15px",
                        }}
                        className="btn btn-primary w-100 py-2"
                        disabled={orderStatus === "Delivered"}
                        onClick={() => updateOrderHandler(order?._id)}
                      >
                        Cập nhật đơn hàng
                      </button>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
