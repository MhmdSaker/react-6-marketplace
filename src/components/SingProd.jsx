import { useParams } from "react-router-dom";
import Product from "./Product";

const SingProd = () => {
  const { id } = useParams();

  return (
    <div style={{margin: "30px", display: "flex", justifyContent: "center"}}>
      <Product productId={id} button={false} />
    </div>
  );
};

export default SingProd;
