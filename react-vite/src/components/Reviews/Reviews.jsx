import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadReviewsThunk } from "../../redux/review";
import { useParams } from "react-router-dom";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(loadReviewsThunk(productId));
  }, [dispatch, productId]);

  console.log("Product ID:", productId);

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

  console.log("Filtered Reviews:", reviewsForProduct);

  if (!reviewsForProduct.length) {
    return <p>No reviews available for this product.</p>;
  }

  return (
    <div>
      {reviewsForProduct.map((review) => (
        <div key={review.id}>
          <p>{review.review}</p>
          <p>{`${month(review.created_at)} ${year(review.created_at)}`}</p>
          <p>{renderStars(review.rating)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
