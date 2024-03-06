// action types

const LOAD_REVIEWS = "review/loadReviews";
const CREATE_REVIEWS = "review/createReviews";
const EDIT_REVIEWS = "review/editReviews";
const DELETE_REVIEWS = "review/deleteReviews";
// action creators

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

const createReview = (review) => ({
  type: CREATE_REVIEWS,
  review,
});

const editReviews = (review) => ({
  type: EDIT_REVIEWS,
  review,
});

const deleteReviews = (reviewId) => ({
  type: DELETE_REVIEWS,
  reviewId,
});

// thunks

// get reviews
export const loadReviewsThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${productId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadReviews(data));
    return data;
  }
};

// create reviews

export const createReviewThunk = (review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/new-review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createReview(data));
    return data;
  }
};

// edit review

export const editReviewThunk = (review, reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  })

  if (response.ok){
    const data = await response.json()
    dispatch(editReviews(data))
    return data
  }
};

// delete review

export const deleteReviewsThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReviews(reviewId));
    return reviewId;
  }
};
// reducer

const initialState = {};
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const newState = {};
      action.reviews.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    }
    case CREATE_REVIEWS: {
      return {
        ...state,
        [action.review.id]: action.review,
      };
    }
    case EDIT_REVIEWS: {
      return {
        ...state,
        [action.review.id]: action.review,
      };
    }
    case DELETE_REVIEWS: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
