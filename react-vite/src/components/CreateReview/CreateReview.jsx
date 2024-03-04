import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../redux/review";
import { loadOneProductThunk } from "../../redux/product";
import "./CreateReview.css";
import { useModal } from "../../context/Modal";

const CreateReview = ({ productId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewError, setReviewError] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      review: reviewText,
      rating: rating,
      product_id: productId,
      user_id: currentUser.id
    };

    const result = await dispatch(
      createReviewThunk(newReview)
    );
    if (result.errors) {
      setReviewError({ message: "Review already exists for this product" });
    } else {
      setReviewText("");
      setRating(0);
      setHoverRating(0);
      closeModal();

      dispatch(loadOneProductThunk(productId));
    }
  };

  const handleStarClick = (newRating) => {
    setRating(newRating);
    setHoverRating(newRating);
  };

  return (
    <div>
      <h1>Add a review</h1>
      {"message" in reviewError && <p>{reviewError.message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
          />
        </label>
        <div id="rating-stars" onMouseLeave={() => setHoverRating(rating)}>
                    {[1, 2, 3, 4, 5].map(star => (
                        <div 
                            key={star}
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            className={hoverRating >= star ? 'star-filled' : 'star-empty'}
                        >
                            ⭐️
                        </div>
                    ))}
          <span> stars </span>
        </div>
        <button type="submit" disabled={reviewText.length < 10 || rating < 1}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
