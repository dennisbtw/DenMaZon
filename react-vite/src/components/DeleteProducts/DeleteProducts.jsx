import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteProductThunk } from "../../redux/product";
import './DeleteProducts.css';

const DeleteProducts = ({ product }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onClick = (e) => {
        e.preventDefault();
        return dispatch(deleteProductThunk(product))
        .then(closeModal)
}
return (
    <div id='delete-container'>
        <h1>Confirm Delete</h1>
        <div className="delete-button-container">
            <span className="confirm-text">Are you sure you want to remove this product?</span>
            <button id='confirm-delete'className='delete-buttons' onClick={onClick}>Yes (Delete Product)</button>
            <button id='no-delete' className="delete-buttons" onClick={closeModal}>No (Keep Product)</button>
        </div>
    </div>
)
}


export default DeleteProducts