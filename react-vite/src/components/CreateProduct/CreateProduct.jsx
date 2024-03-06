import { createProductThunk } from "../../redux/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const validationErrors = {};

    if (!name.length) {
      validationErrors.name = "Name is required";
    } else if (name.length > 200) {
      validationErrors.name = "Name is too long";
    }

    if (!image) {
      validationErrors.image = "Image is required";
    } else if (typeof image === "object" && image.name) {
      if (
        !image.name.endsWith(".jpeg") &&
        !image.name.endsWith(".jpg") &&
        !image.name.endsWith(".png") &&
        !image.name.endsWith(".gif")
      ) {
        validationErrors.image =
          "Image must be in .jpeg, .jpg, .png, or .gif format";
      }
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

    setSubmitted(true);

    if (!Object.values(errors).length) {
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("name", name);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("price", price);

      console.log("FORM DATA", formData);

      const product = await dispatch(createProductThunk(formData));
      navigate(`/products/${product.id}`);
    }
  };

  return (
    <div className="create-product-container">
      <h1>Create a New Product</h1>
      <form
        className="create-product-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="productName">Product Name: </label>
          <input
            id="productName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {submitted && errors.name && (
            <p className="error-message">{errors.name}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Product Image: </label>
          <input
            id="productImage"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {submitted && errors.image && (
            <p className="error-message">{errors.image}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description: </label>
          <textarea
            id="productDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {submitted && errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price: </label>
          <input
            id="productPrice"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {submitted && errors.price && (
            <p className="error-message">{errors.price}</p>
          )}
        </div>
        <div>
          <button className="submit-button" type="submit">
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
