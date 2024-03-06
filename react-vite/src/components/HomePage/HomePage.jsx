import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadProductsThunk } from "../../redux/product";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsObj = useSelector((state) => state.products);
  const products = Object.values(productsObj);

  useEffect(() => {
    dispatch(loadProductsThunk());
  }, [dispatch]);

  if (!products) return null;

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    alert("Feature coming soon!");
  };

  return (
    <div className="home-page-container">
      {products.map((product) => (
        <div
          className="product-card"
          key={product.id}
          onClick={() => handleProductClick(product.id)}
        >
          <div className="product-image-container">
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">
              Price: ${parseFloat(product.price).toFixed(2)}
            </p>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
