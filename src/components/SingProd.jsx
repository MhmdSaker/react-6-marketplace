import { useParams } from "react-router-dom";
import Product from "./Product";

const SingProd = () => {
  const { id } = useParams();

  return <Product productId={id} button={false} />;
};

export default SingProd;
