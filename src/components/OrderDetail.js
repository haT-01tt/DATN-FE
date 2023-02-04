import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/OrderApi";

const OrderDetail = (props) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [order, setOrder] = useState({});
  const [total, setTotal] = useState();
  const {id} = useParams();

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getOrderById(id).then((resp) => {
      console.log(resp.data);
      setOrder(resp.data);
      setTotal(resp.data.totalPrice);
      setOrderDetail(resp.data.orderDetails);
    });
    props.changeHeaderHandler(3);
  };

  return (
    <div className="container-fluid row padding mb-5">
    <div className="col-10 offset-1 text ">
          <p className="display-4 text-primary" style={{ fontSize: "34px",fontWeight: "bolder"  }}>
            Đơn hàng #{order.id}
          </p>
        </div>
      <div className="col-8 welcome mb-5 mt-5">
        <div className="col-10 offset-1 mb-5">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Mã sản phẩm</th>
                <th scope="col">Size</th>
                <th scope="col">Màu</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail &&
                orderDetail.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{item.productDetail.product.name}</th>
                    <td>{item.productDetail.productCapacity.name}</td>
                    <td>{item.productDetail.productColor.name}</td>
                    <td>{item.priceDiscount.toLocaleString()}₫</td>
                    <td>{item.quantity}</td>
                    <td>
                      {(item.priceDiscount * item.quantity).toLocaleString()}₫
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="row mb-5">
            <div className="col offset-8 text ">
              <p className="text-danger">
                Tổng cộng: {total && total.toLocaleString()} đ
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col text ">
              <p
                className="display-4 text-primary"
                style={{ fontSize: "24px" }}
              >
                Trạng thái thanh toán
              </p>
              <p className="text-danger" style={{ fontWeight: "bolder" }}>
                {order && order.payment}
              </p>
            </div>
            <div className="col text ">
              <p
                className="display-4 text-primary"
                style={{ fontSize: "24px" }}
              >
                Trạng thái đơn hàng
              </p>
              <p className="text-danger" style={{ fontWeight: "bolder" }}>
                {order.orderStatus && order.orderStatus.name}
              </p>
            </div>
           
          </div>
        </div>
      </div>
      <div className="col-4 mb-5 mt-5">
        <div className="col-10 offset-1 text ">
          <p className="display-4 text-danger" style={{ fontSize: "24px" }}>
            Thông tin mua hàng
          </p>
          <p>Ngày tạo: {order.createDate}</p>
          <p>Người nhận: {order.customerName}</p>
          <p>Email: {order.email}</p>
        </div>
        <div className="col-10 offset-1 text ">
          <p className="display-4 text-danger" style={{ fontSize: "24px" }}>
            Địa chỉ nhận hàng
          </p>
          <p>SDT: {order.phoneNumber}</p>
          <p>DC: {order.address}</p>
        </div>
      </div>
      
    </div>
  );
};

export default OrderDetail;
