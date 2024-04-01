import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadOneProductThunk } from "../../redux/product";
import ProductReviews from "../Reviews/Reviews";
import CreateReview from "../CreateReview/CreateReview";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products[productId]);
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews);
  const [avgRating, setAvgRating] = useState(null);
  const [numReviews, setNumReviews] = useState(0);

  useEffect(() => {
    dispatch(loadOneProductThunk(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    const productReviews = Object.values(reviews).filter(
      (review) => review.product_id === parseInt(productId)
    );
    if (productReviews.length > 0) {
      const totalRating = productReviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      setAvgRating(totalRating / productReviews.length);
      setNumReviews(productReviews.length);
    } else {
      setAvgRating(null);
      setNumReviews(0);
    }
  }, [reviews, productId]);

  // const handleAddToCartClick = () => {
  //   alert("Feature coming soon!");
  // };

  if (!product) {
    return null;
  }

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail-top-section">
        <div className="product-detail-image-container">
          <img
            src={product?.image}
            alt="Product"
            className="product-detail-image"
          />
        </div>
        <div className="product-detail-details">
          <h1 className="product-detail-title">{product?.name}</h1>
          <p className="product-detail-description">{product?.description}</p>
          <div className="product-detail-rating-container">
            {numReviews > 0 ? (
              <span className="product-detail-rating">
                ⭐️ {avgRating.toFixed(2)} · {numReviews}{" "}
                {numReviews === 1 ? "Review" : "Reviews"}
              </span>
            ) : (
              <span className="product-detail-rating">⭐ New</span>
            )}
          </div>
        </div>
        <div className="product-detail-actions">
          <p className="product-detail-price">
            Price: ${parseFloat(product?.price).toFixed(2)}
          </p>
           {/* <button className="product-detail-add-to-cart" onClick={handleAddToCartClick}>Add to Cart</button> */}
        </div>
      </div>
      <div className="product-detail-reviews">
        {sessionUser && product.user_id !== sessionUser.id && (
          <OpenModalButton
            buttonText="Write a Review"
            buttonId="writeReviewButton"
            modalComponent={<CreateReview productId={productId} />}
          />
        )}
        <ProductReviews productId={productId} />
      </div>
    </div>
  );
};

export default ProductDetail;
