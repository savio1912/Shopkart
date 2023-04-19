import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";
import axios from "axios";
const Product = (props) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { product } = props;

  const addToCartHandler = async () => {
    const existingItem = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const result = await axios.get(`/api/products/${product._id}`);
    const item = result.data;
    if (item.countInStock < quantity) {
      window.alert("Sorry product is out of stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    navigate("/cart");
  };

  return (
    <Card className="product" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>{product.price}</Card.Text>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.category}</Card.Text>
        {product.countInStock > 0 ? (
          <Button onClick={addToCartHandler}> Add to cart</Button>
        ) : (
          <Button disabled variant="light">
            {" "}
            Out of Stock
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
export default Product;
