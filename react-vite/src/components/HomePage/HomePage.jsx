import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadProductsThunk } from "../../redux/product";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const productsObj = useSelector(state => state.products);
  const products = Object.values(productsObj);

  useEffect(() => {
    dispatch(loadProductsThunk());
  }, [dispatch]);

  if (!products) return null;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
          <img src={product.image} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;