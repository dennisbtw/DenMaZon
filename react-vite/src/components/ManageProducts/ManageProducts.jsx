import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserProductsThunk } from "../../redux/product";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProducts from "../DeleteProducts/DeleteProducts"; 

const ManageProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productsObj = useSelector((state) => state.products);
    const sessionUser = useSelector((state) => state.session.user);
    const userProducts = Object.values(productsObj).filter(product => product.user_id === sessionUser.id);

    useEffect(() => {
        dispatch(loadUserProductsThunk());
    }, [dispatch]);

    const handleUpdateProduct = (productId) => {
        navigate(`/products/${productId}/edit`);
    };

    return (
        <div>
            <h2>Manage Your Products</h2>
            {userProducts.map((product) => (
                <div key={product.id}>
                    <div onClick={() => navigate(`/products/${product.id}`)}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
                    </div>
                    <OpenModalButton
                        buttonText='Delete'
                        className='delete-button'
                        modalComponent={<DeleteProducts product={product} />}
                    />
                    <button onClick={() => handleUpdateProduct(product.id)}>Update Product</button>
                </div>
            ))}
        </div>
    );
};

export default ManageProducts;
