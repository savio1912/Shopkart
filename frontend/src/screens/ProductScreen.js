import axios from "axios";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useParams } from "react-router-dom";

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
      <Row>
        <Col sm={12} md={6} lg={6}>
          <img className="productimage" src={data.image} alt={data.name} />
        </Col>
        <Col sm={12} md={3} lg={3}>
          <p>{data.name}</p>
        </Col>
        <Col sm={12} md={3} lg={3}>
          {data.category}
        </Col>
      </Row>
    </div>
  );
};
export default ProductScreen;
