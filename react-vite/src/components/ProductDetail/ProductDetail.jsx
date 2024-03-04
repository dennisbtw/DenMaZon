import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadOneProductThunk } from "../../redux/product";
import ProductReviews from "../Reviews/Reviews";



const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch()
    const product = useSelector(state => state.products[productId]);
    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)



    useEffect(() => {
        dispatch(loadOneProductThunk(productId));
    }, [dispatch, productId]);
    

    return (
        <div>
            <img src={product?.image} />
            <h3>{product?.name}</h3>
            <p>{product?.description}</p>
            <p>Price: ${parseFloat(product?.price).toFixed(2)}</p>
            <ProductReviews reviews = {reviews} />
        </div>
    );
};




export default ProductDetail