import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadOneProductThunk } from "../../redux/product";
import ProductReviews from "../Reviews/Reviews";
import CreateReview from "../CreateReview/CreateReview";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

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
    const productReviews = Object.values(reviews).filter(review => review.product_id === parseInt(productId));
    if (productReviews.length > 0) {
        const totalRating = productReviews.reduce((acc, review) => acc + review.rating, 0);
        setAvgRating(totalRating / productReviews.length);
        setNumReviews(productReviews.length);
    }
  }, [reviews, productId]);

  return (
    <div>
      <img src={product?.image} alt="Product" />
      <h3>{product?.name}</h3>
      <p>{product?.description}</p>
      <p>Price: ${parseFloat(product?.price).toFixed(2)}</p>
      <div className="rating-container">
        {numReviews > 0 ? (
            <span>
                ⭐️ {avgRating.toFixed(2)} · {numReviews} {numReviews === 1 ? 'Review' : 'Reviews'}
            </span>
        ) : (
            <span>⭐ New</span>
        )}
      </div>
      {sessionUser && (
        <OpenModalButton
          buttonText="Write a Review"
          buttonId="writeReviewButton"
          modalComponent={<CreateReview productId={productId} />}
        />
      )}
      <ProductReviews productId={productId} />
    </div>
  );
};

export default ProductDetail;
