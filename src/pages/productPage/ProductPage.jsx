import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductPageStyles.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Alert, Button } from "react-bootstrap";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ProductPage() {
  const location = useLocation();
  let navigate = useNavigate();
  const [alertShow, setAlertShow] = useState(false);

  const { product } = location.state || {};
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (product) {
      getRelatedProducts();
    }
  }, [product]);

  const getRelatedProducts = () => {
    axios
      .get(`${baseUrl}/products/all`)
      .then((response) => {
        const related = response.data
          .filter(
            (prod) =>
              prod.category === product.category && prod.id !== product.id
          )
          .slice(0, 4);
        setRelatedProducts(related);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const ShowRate = ({ rate }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi bi-star-fill ${
            i <= rate ? "text-warning" : "text-secondary"
          }`}
        ></i>
      );
    }
    return <>{stars}</>;
  };

  const addToCart = (product) => {
    const token = localStorage.getItem("token");
    console.log(`Token ${token}`);

    if (token) {
      axios
        .post(
          `${baseUrl}/cart/${product.id}?quantity=1`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          alert("Product added to cart");
          console.log("Product added to cart:", response.data);
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error.message);
        });
    } else {
      setAlertShow(true)
      console.error("Error: Authorization token not found.");
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, {
      state: { product },
    });
  };

  return (
    <>
      <section className="container">
        <h1>Product page</h1>
        <div className="row my-4">
          <div className="imgDiv col-6">
            <img width={"500px"} src={product.imageUrl} alt={product.model} />
          </div>
          <div className="col-6">
            <p className="fw-bold fs-3">
              {product.brand} {product.model}
            </p>
            <p className="d-flex gap-1">
              <ShowRate rate={product.rate} />
              <span className="text-secondary">
                ({product.reviewCount || Math.round(Math.random() * 100)}{" "}
                reviews) | <span className="text-success">In stock</span>
              </span>
            </p>
            <p className="text-success fs-3">${product.price}</p>
            <small>{product.description}</small>
            <hr />
            <div className="my-5 d-flex align-items-start justify-content-center flex-column">
              <button
                className="btn btn-danger w-50"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
              <div className="border rounded d-flex align-items-start justify-content-center flex-column my-3 w-75">
                <div className="d-flex align-items-center jusify-content-center gap-5 p-3">
                  <i className="bi bi-truck fs-1"></i>
                  <div className="d-flex align-items-start justify-content-center flex-column">
                    <p className="fw-bold">Free Delivery</p>
                    <small className="text-decoration-underline">
                      Enter your postal code for Delivery Availability
                    </small>
                  </div>
                </div>
                <div className="partition"></div>
                <div className="d-flex align-items-center jusify-content-center gap-5 p-3">
                  <i className="bi bi-arrow-clockwise fs-1"></i>
                  <div className="d-flex align-items-start justify-content-center flex-column">
                    <p className="fw-bold">Return Delivery</p>
                    <small className="text-decoration-underline">
                      Free 30 Days Delivery Returns. Details
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relatedProducts my-5">
          <div className="titleDiv d-flex align-items-center gap-4 mb-4">
            <div className="redBlock"></div>
            <h4 className="titleText">Related Item</h4>
          </div>
          <div className="products d-flex align-items-center row row-cols-2 row-cols-md-4 g-3">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="col">
                <Card style={{ width: "100%" }}>
                  <Card.Img
                    onClick={() => handleProductClick(relatedProduct)}
                    className="cursor-pointer"
                    variant="top"
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.model}
                  />
                  <Card.Body>
                    <Card.Title>
                      {relatedProduct.brand} {relatedProduct.model}
                    </Card.Title>
                    <Card.Text>
                      <span className="text-success">
                        ${relatedProduct.price}
                      </span>
                      <div>
                        <ShowRate rate={relatedProduct.rate} />
                        <span className="text-secondary">
                          (
                          {product.reviewCount ||
                            Math.round(Math.random() * 100)}
                          )
                        </span>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* alerts */}

      <Alert className="bsAlert" show={alertShow} variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>You need to be in account to add a product in cart.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setAlertShow(false)} variant="outline-danger">
            Close
          </Button>
        </div>
      </Alert>
    </>
  );
}
