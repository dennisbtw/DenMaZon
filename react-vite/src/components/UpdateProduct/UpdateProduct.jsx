import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProductThunk, loadOneProductThunk } from "../../redux/product";
import './UpdateProduct.css';

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const product = useSelector(state => state.products[productId]);
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(loadOneProductThunk(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setPrice(product.price?.toString() || '');
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        
        const validationErrors = {};

        if (!name) {
            validationErrors.name = "Name is required";
        } else if (name.length > 200) {
            validationErrors.name = "Name is too long";
        }

        if (!image && submitted) { 
            validationErrors.image = "Image is required";
        } else if (image && !(image instanceof File)) {
            validationErrors.image = "An image file must be selected";
        } else if (image instanceof File) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(image.type)) {
                validationErrors.image = 'Image must be in .jpeg, .jpg, .png, or .gif format';
            }
        }

        if (!description) {
            validationErrors.description = "Description is required";
        } else if (description.length > 255) {
            validationErrors.description = "Description is too long";
        }

        if (!price) {
            validationErrors.price = "Price is required";
        } else if (isNaN(price) || parseFloat(price) <= 0) {
            validationErrors.price = "Price must be a valid positive number";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const formData = new FormData();
            formData.append("user_id", user?.id || ''); 
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            
            if (image instanceof File) {
                formData.append("image", image);
            }
            
            const updatedProduct = await dispatch(updateProductThunk(formData, productId));
            
            if (!updatedProduct.errors) {
                navigate(`/products/${productId}`);
            }
        }
    };


      return (
        <div>
          <div>
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label>Product Name: </label>
                <input
                  id="productName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
                  {submitted && errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
              </div>
              <div>
                <label>Product Image: </label>
                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  />
                  {submitted && errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
              </div>
              <div>
                <label>Product Description: </label>
                <textarea
                  id="productDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  />
                  {submitted && errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
              </div>
              <div>
                <label>Product Price: </label>
                <input
                  id="productPrice"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  />
                  {submitted && errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
              </div>
              <div>
                <button type="submit">Update Product</button>
              </div>
            </form>
          </div>
        </div>
      );
    };
    
    export default UpdateProduct;
