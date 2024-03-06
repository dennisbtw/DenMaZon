import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserProductsThunk } from "../../redux/product";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProducts from "../DeleteProducts/DeleteProducts";
import "./ManageProducts.css";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsObj = useSelector((state) => state.products);
  const sessionUser = useSelector((state) => state.session.user);
  const userProducts = Object.values(productsObj).filter(
    (product) => product.user_id === sessionUser.id
  );

  useEffect(() => {
    dispatch(loadUserProductsThunk());
  }, [dispatch]);

  const handleUpdateProduct = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  return (
    <div className="manage-products-container">
      <h2>Your Products</h2>
      <div className="manage-products-list">
        {userProducts.map((product) => (
          <div className="manage-product-card" key={product.id}>
            <div
              className="manage-product-image"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img src={product.image} alt={product.name} />
            </div>
            <div className="manage-product-details">
              <h3 className="manage-product-name">{product.name}</h3>
              <p className="manage-product-description">{product.description}</p>
              <p className="manage-product-price">
                Price: ${parseFloat(product.price).toFixed(2)}
              </p>
            </div>
            <div className="manage-product-actions">
              <OpenModalButton
                buttonText="Delete Product"
                className="manage-delete-button"
                modalComponent={<DeleteProducts product={product} />}
              />
              <button
                className="manage-update-button"
                onClick={() => handleUpdateProduct(product.id)}
              >
                Update Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
