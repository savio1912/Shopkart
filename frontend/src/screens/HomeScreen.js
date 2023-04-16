import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
const HomeScreen = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("api/products");
      setData(result.data);
    }
    fetchData()
      .then(() => {
        console.log("api fetch success");
      })
      .catch((err) => {
        console.log(`api fetch failed ${err}`);
      });
  }, []);

  return (
    <>
      <h1>Product List</h1>
      <div className="products">
        <Row>
          {data.map((product) => (
            <Col sm={6} md={4} lr={3} className="mb-3">
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
export default HomeScreen;
