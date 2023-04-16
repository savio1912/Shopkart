import { useParams } from "react-router-dom";

const ProductScreen = () => {
  const { slug } = useParams();
  return <div>{slug}</div>;
};
export default ProductScreen;
