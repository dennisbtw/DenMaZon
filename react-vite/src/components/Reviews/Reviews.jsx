import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadReviewsThunk } from "../../redux/review";
import DeleteReview from "../DeleteReviews/DeleteReview";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateReview from "../UpdateReviews/UpdateReviews";
import "./Reviews.css";

const ProductReviews = ({ productId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadReviewsThunk(productId));
  }, [dispatch, productId]);

  function month(date) {
    const dateCreated = new Date(date);
    const month = dateCreated.getMonth();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month];
  }

  function year(date) {
    const dateCreated = new Date(date);
    return dateCreated.getFullYear();
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>⭐️</span>);
    }
    return stars;
  };

  const reviewsForProduct = Object.values(reviews)
    .filter((review) => review.product_id === parseInt(productId))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (!reviewsForProduct.length) {
    return <p className="no-reviews">No reviews available for this product.</p>;
  }

  return (
    <div className="reviews-container">
      {reviewsForProduct.map((review) => (
        <div key={review.id} className="review">
          <p className="review-text">{review.review}</p>
          <p className="review-date">{`${month(review.created_at)} ${year(review.created_at)}`}</p>
          <p className="review-stars">{renderStars(review.rating)}</p>
          {sessionUser?.id === review?.user_id && (
            <div className="review-buttons">
              <OpenModalButton
                buttonText="Edit Review"
                buttonId={`editReviewButton-${review.id}`}
                modalComponent={
                  <UpdateReview
                    reviewId={review.id}
                    initialReview={review.review}
                    initialRating={review.rating}
                    productId={productId}
                  />
                }
              />
              <OpenModalButton
                buttonText="Delete Review"
                buttonId={`deleteReviewButton-${review.id}`}
                modalComponent={<DeleteReview reviewId={review.id} />}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
