import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getProductById, getProductDetail } from "../api/ProductApi";
import { saveCartItem } from "../api/CartApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = (props) => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState();
  const [capacity, setCapacity] = useState();
  const [count, setCount] = useState(1);
  const [detail, setDetail] = useState();

  useEffect(() => {
    onLoad();
  }, [id]);

  const onLoad = () => {
    getProductById(id)
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => console.log(error));
    props.changeHeaderHandler(2);
  };

  const onModify = (color, capacity) => {
    setCount(1);
    setColor(color);
    setCapacity(capacity);
    if (color && capacity) {
      const data = {
        productId: id,
        capacityId: capacity,
        colorId: color,
      };
      getProductDetail(data).then((response) => {
        setDetail(response.data.id);
        setPrice(response.data.price);
      });
    }
  };

  const onAddCartHandler = async () => {
    if (color && capacity) {
      const data = {
        quantity: count,
        lastPrice: price,
        productDetailId: detail,
        userId: 1
      }
      saveCartItem(data)
        .then(() => toast.success("Thêm vào giỏ hàng thành công!"))
        .catch((error) => console.log(error));
    } else {
      toast.error("Chọn màu hoặc dung lượng!");
    }
  };

  const minusCount = () => {
    if (count !== 1) {
      setCount(count - 1);
    }
  };

  const addCount = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  return (
    <div>
      {item && (
        <div className="col-12 mt-5">
          <div>
            <div className="card mb-3 border-0">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.imgMain}
                    className="img-fluid rounded-start"
                    style={{ width: "600px", height: "400px" }}
                    alt=""
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h1 className="card-title text-danger fw-bolder">
                      {item.name}
                    </h1>
                    <hr />
                    <p className="card-text fw-bold fs-5">
                      Mã SP: {item.productCode}
                    </p>
                    <hr />
                    <h4 className="card-text fw-bolder text-danger fs-5">
                      Giá bán: {price.toLocaleString() + " đ"}
                    </h4>
                    <hr />
                    <div className="div">
                      <label className="mr-5">Chọn màu</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="color"
                          id="inlineRadio3"
                          defaultValue="option3"
                          onChange={() => onModify(1, capacity)}
                        />
                        <label className="form-check-label text-danger">
                          RED
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="color"
                          id="inlineRadio3"
                          defaultValue="option3"
                          onChange={() => onModify(2, capacity)}
                        />
                        <label className="form-check-label text-black">
                          BLACK
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="color"
                          id="inlineRadio3"
                          defaultValue="option3"
                          onChange={() => onModify(3, capacity)}
                        />
                        <label className="form-check-label text-secondary">
                          WHITE
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="color"
                          id="inlineRadio3"
                          defaultValue="option3"
                          onChange={() => onModify(4, capacity)}
                        />
                        <label className="form-check-label text-warning">
                          YELLOW
                        </label>
                      </div>
                    </div>
                    <div className="div">
                      <label className="mr-5">Chọn dung lượng</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="capacity"
                          id="inlineRadio3"
                          defaultValue="option3"
                          onChange={() => onModify(color, 1)}
                        />
                        <label className="form-check-label">64 GB</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="capacity"
                          id="inlineRadio3"
                          defaultValue="option3"
                          onChange={() => onModify(color, 2)}
                        />
                        <label className="form-check-label">128 GB</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="capacity"
                          id="inlineRadio3"
                          defaultValue="option3"
                          onChange={() => onModify(color, 3)}
                        />
                        <label className="form-check-label">256 GB</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="capacity"
                          id="inlineRadio3"
                          defaultValue="option3"
                          onChange={() => onModify(color, 4)}
                        />
                        <label className="form-check-label">512 GB</label>
                      </div>
                    </div>
                    <div className="mt-5">
                      <button
                        className="btn btn-outline-dark"
                        disabled={true}
                        onClick={() => addCount()}
                      >
                        +
                      </button>
                      <input
                        className="text-center"
                        type="number"
                        name="quantity"
                        style={{ width: "60px" }}
                        value={count}
                        min={1}
                      />
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => minusCount()}
                        disabled={true}
                      >
                        -
                      </button>
                    </div>
                    <hr />
                    <button
                      onClick={() => onAddCartHandler()}
                      className="btn btn-primary text-white"
                    >
                      Thêm vào giỏ
                    </button>
                    <NavLink to="/cart" className="btn btn-primary ml-2">
                      Đi đến giỏ hàng
                    </NavLink>
                  </div>
                </div>
                {/* <div className="container row offset-3 mt-5">
                  <img
                    src={require(`../static/images/${item.images[0]}`)}
                    alt="..."
                    className="img-thumbnail mr-3"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <img
                    src={require(`../static/images/${item.images[1]}`)}
                    alt="..."
                    className="img-thumbnail mr-3"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <img
                    src={require(`../static/images/${item.images[2]}`)}
                    alt="..."
                    className="img-thumbnail mr-3"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <img
                    src={require(`../static/images/${item.images[3]}`)}
                    alt="..."
                    className="img-thumbnail mr-3"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <img
                    src={require(`../static/images/${item.images[4]}`)}
                    alt="..."
                    className="img-thumbnail mr-3"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div> */}
              </div>
            </div>
            <div className="col-8 offset-2">
              <div className="container-fluid padding">
                <div className="row welcome text-center text-dark mb-2 mt-5">
                  <div className="col-12">
                    <p className="display-4" style={{ fontSize: "34px" }}>
                      Mô tả sản phẩm
                    </p>
                  </div>
                </div>
              </div>
              <div className="container-fluid padding">
                <h5 className="font-italic">{item.description}</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
