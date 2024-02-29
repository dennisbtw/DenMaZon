import { createProductThunk } from "../../redux/product"
import { useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        const validationErrors = {};

        if (!name.length) {
            validationErrors.name = "Name is required";
        } else if (name.length > 200) {
            validationErrors.name = "Name is too long";
        }

        if (!image) {
            validationErrors.image = "Image is required";
        }

        if (!description.length) {
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
    }, [name, image, description, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setSubmitted(true)
    
        if (!Object.values(errors).length) {
          const formData = new FormData();
          formData.append("user_id", user.id);
          formData.append("name", name);
          formData.append("image", image);
          formData.append("description", description);
          formData.append("price", price);

    
          const product = await dispatch(createProductThunk(formData))
          navigate(`/products/${product.id}`)
        }
      }

      return (
        <div>
          <div>
            <h1>Create a New Product</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label>Product Name</label>
                <input
                  id="productName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
                  {submitted && errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
              </div>
              <div>
                <label>Product Image</label>
                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  />
                  {submitted && errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
              </div>
              <div>
                <label>Product Description</label>
                <textarea
                  id="productDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  />
                  {submitted && errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
              </div>
              <div>
                <label>Product Price</label>
                <input
                  id="productPrice"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  />
                  {submitted && errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
              </div>
              <div>
                <button type="submit">Create Product</button>
              </div>
            </form>
          </div>
        </div>
      );
    };
    
    export default CreateProduct;
