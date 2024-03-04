import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewsThunk } from "../../redux/review";

const DeleteReview = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewsThunk(reviewId));
    closeModal();
  };
  return (
    <div id="delete-container">
      <h1>Confirm Delete</h1>
      <div className="delete-button-container">
        <span className="confirm-text">
          Are you sure you want to remove this product?
        </span>
        <button
          id="confirm-delete"
          className="delete-buttons"
          onClick={onClick}
        >
          Yes (Delete Product)
        </button>
        <button id="no-delete" className="delete-buttons" onClick={closeModal}>
          No (Keep Product)
        </button>
      </div>
    </div>
  );
};

export default DeleteReview;