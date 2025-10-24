import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function OurProductsLast() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios
      .get(`${baseUrl}/products/all`)
      .then((response) => {
        console.log(response.data);
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const renderRandomProduct = () => {
    const randomProduct =
      allProducts[Math.round(Math.random() * allProducts.length)];
    if (randomProduct) {
      return (
        <div
          style={{ height: "400px", width: "400px" }}
          className="d-flex flex-column align-items-center justify-content-center border rounded"
        >
          <img
            style={{ maxWidth: "80%", maxHeight: '70%'}}
            className="rounded"
            src={randomProduct.imageUrl}
          />
          <div className="d-flex flex-column align-items-center justify-content-center p-3">
            <h4>
              {randomProduct.brand} {randomProduct.model}
            </h4>
            <p style={{ fontSize: "15px" }}>
              {randomProduct.description.slice(0, 70)}
            </p>
            <Link className="btn btn-outline-primary w-50" to={"/shop"}>
              Shop Now
            </Link>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="d-flex flex-row gap-3 align-items-center">
            <div className="redBlock"></div>
            <span className="text-danger fw-bold">Our Products</span>
          </div>
          <span className="fw-600 fs-1">Explore Our Products</span>
        </div>

        <div className="d-flex align-items-center justify-content-center my-5 gap-2">
          {renderRandomProduct()}
          {renderRandomProduct()}
          {renderRandomProduct()}
          {renderRandomProduct()}
        </div>
      </section>
    </>
  );
}
