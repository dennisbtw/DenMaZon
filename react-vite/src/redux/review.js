// action types

const LOAD_REVIEWS = "review/loadReviews";
const CREATE_REVIEWS = "review/createReviews";
// action creators

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

const createReview = (review) => ({
  type: CREATE_REVIEWS,
  review,
});

// thunks

export const loadReviewsThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${productId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadReviews(data));
    return data;
  }
};

export const createReviewThunk = (review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/new-review`, {
    method: "POST",
    body: review,
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createReview(data));
    return data;
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
        [action.review.id]: action.review
      };
    }
    default:
      return state;
  }
};

export default reviewReducer;
