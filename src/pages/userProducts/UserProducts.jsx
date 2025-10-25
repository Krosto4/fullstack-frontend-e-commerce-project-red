import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";
import "./userProductsStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function UserProducts() {
  let navigate = useNavigate()

  useEffect(() => {
    authorithatedUserCheck();
  });

  const authorithatedUserCheck = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      return;
    }
  };

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    category: "",
    description: "",
    price: "",
    rate: "",
    imageUrl: "",
  });

  const [validated, setValidated] = useState(false);

  const [formCategories, setFormCategories] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState({});

  const [imageShow, setImageShow] = useState(false);
  const handleImageClose = () => {
    setImageShow(false);
    setSelectedProduct({});
  };
  const handleImageShow = (product) => {
    setImageShow(true);
    setSelectedProduct(product);
  };

  const [editModalshow, setEditModalShow] = useState(false);
  const handleEditModalClose = () => {
    setEditModalShow(false);
    setSelectedProduct({});
  };
  const handleEditModalShow = (product) => {
    setEditModalShow(true);
    setSelectedProduct(product);
    setFormData({
      brand: product.brand,
      model: product.model,
      category: product.category,
      description: product.description,
      price: product.price,
      rate: product.rate,
      imageUrl: product.imageUrl,
    });
    setValidated(false);
  };
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    getUserProducts();
  }, []);

  useEffect(() => {
    getProductsCategory();
  }, []);

  const getUserProducts = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${baseUrl}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserProducts(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching user products:",
          error.response?.data || error.message
        );
      });
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

  const handleDelete = (productId) => {
    const token = localStorage.getItem("token");
    console.log(productId);
    axios
      .delete(`${baseUrl}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Product deleted successfully!");
        getUserProducts();
      })
      .catch((error) => {
        console.error(
          `Error with deleting product ${productId} ${error.message}`
        );
      });
  };

  // Product edit funcs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);

    const token = localStorage.getItem("token");

    axios
      .put(`${baseUrl}/products/${selectedProduct.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getUserProducts();
        alert(`Your product has been updated!`);
        handleEditModalClose();
      })
      .catch((error) => {
        console.error("Something went wrong..", error.message);
      });
  };

  return (
    <>
      <section className="container">
        <Link to={"/addNewProduct"} className="btn btn-primary">
          Add a new product
        </Link>
        <Table
          striped
          bordered
          hover
          responsive
          className="align-middle text-center my-2"
        >
          <thead className="">
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price ($)</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userProducts.length > 0 ? (
              userProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.brand}</td>
                  <td>{product.model}</td>
                  <td>{product.category}</td>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.model}
                      className="rounded w-80px"
                      onClick={() => handleImageShow(product)}
                    />
                  </td>
                  <td className="text-success">${product.price.toFixed(2)}</td>
                  <td>{product.rate}/5</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditModalShow(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </section>

      {/* Modals */}

      {/* 1. Image modal */}
      <Modal show={imageShow} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedProduct.brand} {selectedProduct.model}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex align-items-center justify-content-center">
          <img className="w-75" src={selectedProduct.imageUrl} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleImageClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 2. Edit modal */}
      <Modal show={editModalshow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmitEdit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    placeholder="Enter brand name"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please type a brand
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="model">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    placeholder="Enter model name"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please type a model
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="category">
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
                        <option key={idx} value={category}>
                          {category}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please choose a category
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>
                    Price <span className="text-success">$</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please set a price
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    name="rate"
                    onChange={handleChange}
                    min="1"
                    max="5"
                    step="1"
                    value={formData.rate}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Please set a rating
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please type a desripton
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                placeholder="Enter image URL"
                onChange={handleChange}
                required
              />

              <Form.Control.Feedback type="invalid">
                Please paste an Image URL
              </Form.Control.Feedback>
            </Form.Group>

            {/* Image Preview */}
            {formData.imageUrl ? (
              <div className="text-center mb-3">
                <img
                  src={formData.imageUrl}
                  alt="Something went wrong with your URL"
                  className="rounded w-80px"
                />
              </div>
            ) : (
              ""
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="primary" onClick={handleSubmitEdit}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleEditModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
