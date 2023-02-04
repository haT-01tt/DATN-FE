import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import ProductDetail from "../components/ProductDetail";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Order from "../components/Order";
import OrderDetail from "../components/OrderDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Register from "../authenticate/Register";
import SignIn from "../authenticate/SignIn";

const UserLayOut = () => {
  const [temp, setTemp] = useState(true);
  const [buy, setBuy] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [header, setHeader] = useState(1);
  const [user, setUser] = useState({});

  useEffect(() => {
    setCartItem([]);
    setBuy([]);
    setUser(localStorage.getItem("user"));
  }, [temp]);

  const refresh = (data) => {
    setTemp(data);
  };

  const userHandler = (user) => {
    setUser(user);
  };

  const changeHeaderHandler = (value) => {
    setHeader(value);
  };

  const buyHandler = (id) => {
    setBuy([...buy, id]);
  };

  const cancelBuyHandler = (id) => {
    const res = buy.filter((item) => item != id);
    setBuy(res);
  };

  const clearBuyHandler = () => {
    setBuy([]);
  };

  const addHandler = (data) => {
    const res = cartItem.find((item) => item.id === data.id);
    if (res) {
      setCartItem(
        cartItem.map((item) =>
          item.id === data.id
            ? { ...res, quantity: res.quantity + data.quantity }
            : item
        )
      );
    } else {
      setCartItem([...cartItem, data]);
    }
  };
  const cartHandler = (data) => {
    setCartItem(data);
  };

  const clearHandler = () => {
    const res = cartItem.filter((item) => !buy.includes(item.id + ""));
    setCartItem(res);
  };

  const setCartItemHandler = (data) => {
    setCartItem(data);
  };

  return (
    <div className="col-10 offset-1">
      <Header
        header={header}
        user={user}
        userHandler={userHandler}
        refresh={refresh}
      ></Header>
      <Switch>
        <Route path="/" exact>
          <Home changeHeaderHandler={changeHeaderHandler} user={user}></Home>
        </Route>
        <Route path={`/product-detail/:id`} exact>
          <ProductDetail
            changeHeaderHandler={changeHeaderHandler}
            user={user}
            addHandler={addHandler}
          ></ProductDetail>
        </Route>
        <Route path="/cart" exact>
          <Cart
            buyHandler={buyHandler}
            cancelBuyHandler={cancelBuyHandler}
            clearBuyHandler={clearBuyHandler}
            buy={buy}
            changeHeaderHandler={changeHeaderHandler}
            user={user}
            cartItem={cartItem}
            cartHandler={cartHandler}
          ></Cart>
        </Route>
        <Route path="/checkout" exact>
          <Checkout
            temp={temp}
            buy={buy}
            changeHeaderHandler={changeHeaderHandler}
            user={user}
            cartItem={cartItem}
            clearHandler={clearHandler}
            setCartItemHandler={setCartItemHandler}
          ></Checkout>
        </Route>
        <Route path="/order" exact>
          <Order changeHeaderHandler={changeHeaderHandler} user={user}></Order>
        </Route>
        <Route path="/order/detail/:id" exact>
          <OrderDetail
            changeHeaderHandler={changeHeaderHandler}
            user={user}
          ></OrderDetail>
        </Route>
        <Route path="/register" exact>
          <Register></Register>
        </Route>
        <Route path="/sign-in" exact>
          <SignIn userHandler={userHandler}></SignIn>
        </Route>
      </Switch>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default UserLayOut;
