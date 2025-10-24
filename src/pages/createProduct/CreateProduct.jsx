import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    category: "",
    description: "",
    price: "",
    rate: "",
    imageUrl: "",
  });

  const [formCategories, setFormCategories] = useState([]);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    getProductsCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getProductsCategory = () => {
    let categories;
    axios
      .get(`${baseUrl}/products/all`)
      .then((response) => {
        categories = response.data.map((product) => product.category);
        setFormCategories([...new Set(categories)]);
      })
      .catch((error) => {
        console.error(`Error with fetching categories, ${error.message}.`);
      });
  };

  const handleReset = () => {
    setFormData({
      brand: "",
      model: "",
      category: "",
      description: "",
      price: "",
      rating: "",
      imageUrl: "",
    });
    setValidated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    const token = localStorage.getItem("token");

    if (form.checkValidity() === false) {
      return;
    }

    axios
      .post(`${baseUrl}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Product created successfully!");
        setFormData({
          brand: "",
          model: "",
          category: "",
          description: "",
          price: "",
          rating: "",
          imageUrl: "",
        });
      })
      .catch((error) => {
        console.error(`Something went wronng: ${error.message}}`);
      });

    setValidated(true);
  };
  return (
    <>
      <section className="container">
        <h1 className="text-center">Create new product</h1>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <Form noValidate validated={validated}
            onSubmit={handleSubmit}
            className="d-flex flex-column gap-3 w-50"
          >
            {/* Brand */}
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                placeholder="Enter brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a brand name.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Model */}
            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                placeholder="Enter model"
                value={formData.model}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a model name.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Category */}
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {formCategories.map((category, idx) => {
                  return (
                    <option key={idx} name={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a category.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Description */}
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Price */}
            <Form.Group controlId="price">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid price.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Rating */}
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                placeholder="1–5"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                step="1"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a rating between 1 and 5.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Image URL */}
            <Form.Group controlId="imageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                placeholder="Enter image URL"
                value={formData.imageUrl}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide an image URL.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Preview */}
            {formData.imageUrl && (
              <div className="text-center w-100">
                <img
                  width={"200px"}
                  src={formData.imageUrl}
                  alt="Something went wrong with your image"
                  className="rounded"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="d-flex justify-content-center gap-3 mt-3 my-2">
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Button variant="secondary" type="button" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}
