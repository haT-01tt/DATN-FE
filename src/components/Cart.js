import React, { useState, useEffect } from "react";
import {
  getCartItemByAccountId,
  addCartItem,
  minusCartItem,
  removeCartItem
} from "../api/CartApi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const history = useHistory();
  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    const userId = localStorage.getItem("user");
    if(userId){
      getCartItemByAccountId(userId).then((response) => {
        setCart(response.data);
      });
      props.changeHeaderHandler(2);
    }else{
      history.push('/sign-in')
    }
  };

  const addCartItemHandler = (id) => {
    addCartItem(id)
      .then(() => {
        onLoad();
      })
      .catch((error) => toast.error(error.response.data.Errors));
  };

  const minusCartItemHandler = (id) => {
    minusCartItem(id)
      .then(() => {
        onLoad();
      })
      .catch((error) => toast.error(error.response.data.Errors));
  };

  const removeCartItemHandler = (id) => {
    removeCartItem(id)
    .then(() => {
      toast.success("Xóa khỏi giỏ hàng thành công!");
      onLoad();
    })
    .catch((error) => console.log(error));
  };

  const checkOutHandler = () => {
    if(cart.length > 0 ){
      history.push("/checkout");
    }else{
      toast.error("Giỏ hàng trống!");
    }
  };

  return (
    <div className="col-12">
      <div className="container-fluid mb-5 mt-5">
        <div className="mini-card">
          <h4 className="text-danger">Giỏ hàng của bạn</h4>
        </div>
        <div className="">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Ảnh</th>
                <th scope="col">Tên</th>
                <th scope="col">Màu</th>
                <th scope="col">Dung lượng</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thành tiền</th>
                <th scope="col">Xoá</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.map((item, index) => (
                  <tr key={index}>
                    <th>
                      <img
                        className="img-fluid"
                        style={{ width: "100px", height: "100px" }}
                        src={item.productDetail.product.imgMain}
                        alt=""
                      />
                    </th>
                    <td>
                      <h6 className="card-title mt-5 bolder">
                        {item.productDetail.product.name}
                      </h6>
                    </td>
                    <td>
                      <h6 className="card-title mt-5 bolder">
                        {item.productDetail.productColor.name}
                      </h6>
                    </td>
                    <td>
                      <h6 className="card-title mt-5 bolder">
                        {item.productDetail.productCapacity.name}
                      </h6>
                    </td>
                    <td>
                      <h6 className="card-title mt-5 bolder">
                        {item.productDetail.price.toLocaleString()} đ
                      </h6>
                    </td>
                    <td>
                      <div className="mt-5">
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => addCartItemHandler(item.id)}
                        >
                          +
                        </button>
                        <input
                          type="number"
                          name="quantity"
                          className="text-center"
                          style={{ width: "40px" }}
                          value={item.quantity}
                          min={1}
                        />
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => minusCartItemHandler(item.id)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>
                      <h6 className="card-title mt-5 bolder">
                        {(
                          item.quantity * item.productDetail.price
                        ).toLocaleString()}{" "}
                        đ
                      </h6>
                    </td>
                    <td>
                      <button
                        className="border-0 pl-4"
                        style={{ backgroundColor: "white" }}
                        onClick={() =>
                          removeCartItemHandler(item.id)
                        }
                      >
                        <i
                          className="fa fa-trash-o mt-5 text-danger"
                          style={{ fontSize: "24px" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <hr className="my-4" />
          <div className="row container-fluid">
            <button
              className="btn btn-primary mb-3 btn-lg"
              onClick={checkOutHandler}
            >
              Mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
