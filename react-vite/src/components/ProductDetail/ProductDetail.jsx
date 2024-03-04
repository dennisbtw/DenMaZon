import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadOneProductThunk } from "../../redux/product";
import ProductReviews from "../Reviews/Reviews";
import CreateReview from "../CreateReview/CreateReview";

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch()
    const product = useSelector(state => state.products[productId]);
    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)
    const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);


    useEffect(() => {
        dispatch(loadOneProductThunk(productId));
    }, [dispatch, productId]);
    

    return (
        <div>
            <img src={product?.image} />
            <h3>{product?.name}</h3>
            <p>{product?.description}</p>
            <p>Price: ${parseFloat(product?.price).toFixed(2)}</p>
            <button onClick={() => setShowCreateReviewModal(true)}>Write a Review</button>
            {showCreateReviewModal && <CreateReview productId={productId} setShowCreateReviewModal={setShowCreateReviewModal} />}
            <ProductReviews reviews={reviews} />
        </div>
    );
};




export default ProductDetail