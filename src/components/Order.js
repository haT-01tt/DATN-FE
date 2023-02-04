import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAllOrder } from "../api/OrderApi";

const status = {
  1: "Chờ xác nhận",
  2: "Đã xác nhận",
  3: "Đang giao",
  4: "Đã giao",
  5: "Đã hủy",
};


const Order = (props) => {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const history = useHistory();
  var rows = new Array(total).fill(0).map((zero, index) => (
    <li
      className={page === index + 1 ? "page-item active" : "page-item"}
      key={index}
    >
      <button
        className="page-link"
        style={{ borderRadius: 50 }}
        onClick={() => onChangePage(index + 1)}
      >
        {index + 1}
      </button>
    </li>
  ));

  const onChangePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    onLoad();
  }, [page]);

  const onLoad = () => {
    const userId = localStorage.getItem("user");
    console.log(userId);
    if (userId) {
      console.log(userId);
      getAllOrder(userId, page, 8)
        .then((res) => {
          setOrder(res.data.content);
          setTotal(res.data.totalPages);
        })
        .catch((error) => console.log(error.response.data.Errors));
      props.changeHeaderHandler(3);
    } else {
      history.push("/sign-in");
    }
  };

  return (
    <div>
      <div className="col-12">
        <div className="container-fluid welcome mb-5 mt-2">
          <div className="col-10 offset-1 text mini-card">
            <p className="text-danger text-center" style={{ fontSize: "34px" }}>
              Đơn hàng của bạn
            </p>
          </div>
          <div className="row col-12 mb-5">
            <table className="table table-striped table-bordered mt-2 text-center">
              <thead>
                <tr>
                  <th scope="col">Đơn hàng</th>
                  <th scope="col">Ngày tạo</th>
                  <th scope="col">Tình trạng thanh toán</th>
                  <th scope="col">Tình trạng vận chuyển</th>
                  <th scope="col">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <h6 className="card-title mt-2 bolder">
                          <NavLink to={`/order/detail/${item.id}`} exact>
                            #{item.orderCode}
                          </NavLink>
                        </h6>
                      </th>
                      <td>
                        <h6 className="card-title mt-2 bolder">
                          {item.createDate}
                        </h6>
                      </td>
                      <td>
                        <h6 className="card-title mt-2 bolder text-success">
                          {item.payment}
                        </h6>
                      </td>
                      <td>
                        <h6 className="card-title mt-2 bolder">
                          {status[item.statusId]}
                        </h6>
                      </td>
                      <td>
                        <h6 className="card-title mt-2 bolder">
                          {item.totalPrice.toLocaleString()} ₫
                        </h6>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <nav aria-label="navigation" className="col-4 offset-5">
              <ul className="pagination">
                <li className={page === 1 ? "page-item disabled" : "page-item"}>
                  <button
                    className="page-link"
                    style={{ borderRadius: 50 }}
                    onClick={() => onChangePage(1)}
                  >{`<<`}</button>
                </li>
                {rows}
                <li
                  className={
                    page === total ? "page-item disabled" : "page-item"
                  }
                >
                  <button
                    className="page-link"
                    style={{ borderRadius: 50 }}
                    onClick={() => onChangePage(total)}
                  >
                    {" "}
                    {`>>`}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
