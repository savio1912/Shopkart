import axios from "axios";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Helmet } from "react-helmet-async";

const ProductScreen = () => {
  const [data, setData] = useState({});
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
          <Card>
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
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default ProductScreen;
