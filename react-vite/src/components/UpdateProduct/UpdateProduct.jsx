import { loadOneProductThunk, updateProductThunk } from "../../redux/product";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './UpdateProduct.css';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = useSelector(state => state.products[productId]);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
      if (productId) {
          dispatch(loadOneProductThunk(productId));
      }
  }, [dispatch, productId]);

  useEffect(() => {
      if (product) {
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
      }
  }, [product]);

  useEffect(() => {
      const validationErrors = {};

      if (!name?.length) {
          validationErrors.name = "Name is required";
      } else if (name.length > 200) {
          validationErrors.name = "Name is too long";
      }

      // if (image instanceof File && image.name) {
      //     if (!image.name.endsWith('.jpeg') && !image.name.endsWith('.jpg') && !image.name.endsWith('.png') && !image.name.endsWith('.gif')) {
      //         validationErrors.image = 'Image must be in .jpeg, .jpg, .png, or .gif format';
      //     }
      // }

      if (!description?.length) {
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
  }, [name, description, price]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitted(true);

      if (Object.keys(errors).length === 0) {
          const formData = new FormData();
          formData.append("user_id", user?.id);
          formData.append("name", name);
          if (image) {
              formData.append("image", image);
          }
          formData.append("description", description);
          formData.append("price", price);

          await dispatch(updateProductThunk(formData, productId));
          navigate(`/products/${productId}`);
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
                  {/* {submitted && errors.image && <p style={{ color: 'red' }}>{errors.image}</p>} */}
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
