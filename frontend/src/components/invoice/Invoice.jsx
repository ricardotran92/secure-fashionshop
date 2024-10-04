import React, { useEffect } from 'react'
import "./Invoice.css"
import MetaData from '../layout/MetaData'
import { useParams } from 'react-router-dom';
import { useOrderDetailsQuery } from '../../redux/api/orderApi';
import Loader from '../layout/Loader';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Invoice = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const { shippingInfo, orderItems, paymentInfo, user, totalAmount, orderStatus } = order;

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleDownload = () =>{
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL ("image/png");

      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${order?._id}.pdf`)
    })
  };

  if (isLoading) return <Loader />

  return (
    <>
    <MetaData title = {"Hóa đơn"} />
    <div className="order-invoice my-5">
      <div className="row d-flex justify-content-center mb-5">
        <button className="btn btn-success col-md-5" onClick={handleDownload}>
          <i className="fa fa-print"></i> Tải về Hóa Đơn
        </button>
      </div>

      <div style={{ width: '100%', margin: 'auto', overflowX: 'auto' }}>
        <div id="order_invoice" className="p-3 border border-secondary">
          <header className="clearfix">
            <div id="logo">
              <img src="/images/Logo/png/logo-no-background.png" alt="FashionShop Logo" />
            </div>
            <h1>Hóa Đơn Số {order?._id}</h1>
            <div id="company" className="clearfix">
              <div>FashionShop</div>
              <div>
                Hàn Thuyên,
                <br />
                KP6, Linh Trung, Thủ Đức, HCM
              </div>
              <div>(0999) 113-114</div>
              <div>
                <a href="mailto:info@fashionshop.com">info@fashionshop.com</a>
              </div>
            </div>
            <div id="project">
            <div><span>KHÁCH HÀNG</span> {user?.name}</div>
              <div><span>EMAIL</span> {user?.email}</div>
              <div><span>ĐIỆN THOẠI</span> {shippingInfo?.phoneNo}</div>
              <div>
                <span>ĐỊA CHỈ</span> {shippingInfo?.address}
              </div>
              <div><span>NGÀY MUA</span> {new Date(order?.createdAt).toLocaleString("vi-VN")}</div>
              <div><span>THANH TOÁN</span> {paymentInfo?.status}</div>
            </div>
          </header>

          <main>
            <table className="mt-5">
              <thead>
                <tr>
                  <th className="service">Mã sản phẩm</th>
                  <th className="desc">Tên sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item) => (
                  <tr>
                    <td className="service">{item?.product }</td>
                    <td className="desc">{item?.name} - Màu: {item?.selectedColor} - Kích thước: {item?.selectedSize}</td>
                    <td className="unit">{item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td className="qty">{item?.quantity}</td>
                    <td className="total">{(item?.price * item?.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  </tr>
                ))}

                <tr>
                  <td colspan="4">
                    <b>Tiền hàng</b>
                  </td>
                  <td className="total">{order?.itemsPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                </tr>

                <tr>
                  <td colspan="4">
                    <b>Phí vận chuyển</b>
                  </td>
                  <td className="total">{order?.shippingAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                </tr>

                <tr>
                  <td colspan="4" className="grand total">
                    <b>TỔNG THANH TOÁN</b>
                  </td>
                  <td className="grand total">{order?.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                </tr>
              </tbody>
            </table>
            <div id="notices">
              <div>Lưu ý:</div>
              <div className="notice">
                Hàng mua rồi vui lòng miễn đổi trả!
              </div>
            </div>
          </main>
          <footer>
            Hóa đơn cho Bộ IE104 lập...vô giá trị!
          </footer>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default Invoice