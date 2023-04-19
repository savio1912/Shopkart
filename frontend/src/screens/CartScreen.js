import { useContext } from "react";
import { Store } from "../Store";

import React from "react";
import { Helmet } from "react-helmet-async";
import ErrorMessage from "../components/ErrorMessage";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  let num = 0;
  let amt = 0;

  const updateCartHandler = async (product, quantity) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry product is out of stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
  };
  const removeCartItem = (product) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: product });
  };
  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping kart</h1>
      <Row>
        <Col md={8}>
          {state.cart.cartItems.length === 0 ? (
            <ErrorMessage>
              Cart is empty<Link to="/">Got to Shopping</Link>
            </ErrorMessage>
          ) : (
            <ListGroup>
              {state.cart.cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => {
                          updateCartHandler(item, item.quantity - 1);
                        }}
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fa-solid fa-minus-circle"></i>
                      </Button>
                      {"     "}
                      <span>{item.quantity}</span>
                      {"     "}
                      <Button
                        onClick={() => {
                          updateCartHandler(item, item.quantity + 1);
                        }}
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fa-solid fa-plus-circle"></i>
                      </Button>{" "}
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => {
                          removeCartItem(item);
                        }}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>
                    Subtotal
                    {state.cart.cartItems.forEach((item) => {
                      num = num + item.quantity;
                    })}
                    ({num} items): $
                    {state.cart.cartItems.forEach((item) => {
                      amt = amt + Number(item.amount) * item.quantity;
                    })}
                    {amt}
                  </h3>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-grid">
                    <Button
                      onClick={checkOutHandler}
                      variant="primary"
                      disabled={state.cart.cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
