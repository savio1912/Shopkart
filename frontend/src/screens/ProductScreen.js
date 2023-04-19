import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { Col } from "react-bootstrap";

const ProductScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const [data, setData] = useState({});
  const addToCartHandler = async () => {
    const existingItem = state.cart.cartItems.find(
      (item) => item._id === data._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const result = await axios.get(`/api/products/${data._id}`);
    const product = result.data;
    if (product.countInStock < quantity) {
      window.alert("Sorry product is out of stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...data, quantity } });
    navigate("/cart");
  };
  const params = useParams();
  const { slug } = params;
  useEffect(() => {
    async function FetchData() {
      const info = await axios.get(`/api/products/slug/${slug}`);
      setData(info.data);
    }
    FetchData();
  }, [slug]);

  return (
    <div>
      <Helmet>
        <title>{data.name}</title>
      </Helmet>
      <Row>
        <Col sm={12} md={6} lg={6}>
          <img className="productimage" src={data.image} alt={data.name} />
        </Col>
        <Col sm={12} md={3} lg={3}>
          <ul className="unordered-list">
            <li>
              <h1>{data.name}</h1>
            </li>
            <hr></hr>
            <li>
              <Rating rating={data.rating} numReviews={data.numReviews} />
            </li>
            <hr></hr>
            <li> Price : {data.price}</li>
            <hr></hr>
            <li> Description : {data.description}</li>
          </ul>
        </Col>
        <Col sm={12} md={3} lg={3}>
          <Card className="card">
            <Card.Body>
              <ul className="unordered-list">
                <li>Price: {data.price}</li>
                <hr></hr>
                <li>
                  {data.countInStock >= 1 ? (
                    <Badge bg="success">In stock</Badge>
                  ) : (
                    <Badge bg="danger">Unavailable</Badge>
                  )}
                </li>
                {data.countInStock >= 1 && (
                  <li>
                    <div className="d-grid">
                      <Button variant="primary" onClick={addToCartHandler}>
                        Add to cart
                      </Button>
                    </div>
                  </li>
                )}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default ProductScreen;
