import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadOneProductThunk } from "../../redux/product";

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch()
    const product = useSelector(state => state.products[productId]);



    useEffect(() => {
        dispatch(loadOneProductThunk(productId));
    }, [dispatch, productId]);
    

    return (
        <div>
            <img src={product?.image} />
            <h3>{product?.name}</h3>
            <p>{product?.description}</p>
            <p>Price: ${parseFloat(product?.price).toFixed(2)}</p>
        </div>
    );
};




export default ProductDetail