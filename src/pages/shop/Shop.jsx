import "./shopStyles.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios
      .get(`${baseUrl}/products/all`)
      .then((response) => {
        console.log(response.data);
        setAllProducts(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
              Authorization: `Bearer: ${token}`,
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
      console.error("Error: Authorization token not found.");
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, {
      state: { product },
    });
  };

  const handleCategoryFilter = (category) => {
    const filteredProducts = allProducts.filter(
      (product) => product.category === category
    );
    setProducts(filteredProducts);
  };

  const handleRateFilter = (rate) => {
    const filteredProducts = allProducts.filter(
      (product) => product.rate === rate
    );
    setProducts(filteredProducts);
  };

  const handleSortChange = (event) => {
    const order = event.target.value === "1" ? "asc" : "desc";
    const sortedProducts = sortProductsByPrice([...products], order);
    setProducts(sortedProducts);
  };

  const sortProductsByPrice = (productsToSort, order = "asc") => {
    return productsToSort.sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else if (order === "desc") {
        return b.price - a.price;
      } else {
        console.error("Invalid order parameter");
        return 0;
      }
    });
  };

  const handleSearch = (e) => {
    const searchWord = e.target.value.toLowerCase();
    setSearchTerm(searchWord);

    let filteredProducts;
    if (searchWord === "") {
      filteredProducts = allProducts;
    } else {
      filteredProducts = allProducts.filter((product) => {
        const brandAndModel = (
          product.brand +
          " " +
          product.model
        ).toLowerCase();
        return brandAndModel.includes(searchWord);
      });
    }

    setProducts(filteredProducts);
  };

  const getUniqueCategories = () => {
    const categories = allProducts.map((product) => product.category);
    return [...new Set(categories)];
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
  return (
    <>
      <section className="container my-4">
        <h1 className="my-3">Shop</h1>
        <div className="row">
          <div className="col-2 sideBar">
            <div className="searchInpDiv">
              <input
                className="searchInp mb-3"
                value={searchTerm}
                placeholder="Search"
                type="search"
                onChange={handleSearch}
              />
            </div>

            <div className="categoryDiv my-3 py-2">
              <h3>Categories</h3>
              <div className="ps-3 fw-bold fs-5">
                {getUniqueCategories().map((category, index) => (
                  <div
                    key={index}
                    className="my-1 cursor-pointer"
                    onClick={() => handleCategoryFilter(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className="rateDiv my-3 py-2">
              <h3>Rate</h3>
              <div className="ps-3 fw-bold fs-5">
                <div className="my-1">
                  {[5, 4, 3, 2, 1].map((rate) => (
                    <div
                      key={rate}
                      className="rate my-2 cursor-pointer"
                      onClick={() => handleRateFilter(rate)}
                    >
                      {[...Array(rate)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning"></i>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-10">
            <div className="filters mb-3 w-25">
              <button onClick={getAllProducts} className="btn btn-danger mb-2">
                All products
              </button>
              <select
                className="form-control"
                onChange={handleSortChange}
                aria-label="Sort products by price"
                defaultValue=""
              >
                <option value="">Sort by</option>
                <option value="1">Price: Low to High</option>
                <option value="2">Price: High to Low</option>
              </select>
            </div>

            <div className="row row-cols-2 row-cols-md-4">
              {products.length > 0 ? products.map((product, index) => {
                return(
                <Card key={index} style={{ width: "18rem" }}>
                  <Card.Img
                    onClick={() => handleProductClick(product)}
                    className="cursor-pointer"
                    variant="top"
                    src={product.imageUrl}
                  />
                  <Card.Body>
                    <Card.Title>
                      {product.brand} {product.model}
                    </Card.Title>
                    <Card.Text>
                      <span className="text-success">{product.price}$</span>
                      <br />
                      <span>
                        <ShowRate rate={product.rate} />
                        <span className="text-secondary">
                          ({product.reviewCount || Math.round(Math.random() * 100)})
                        </span>
                      </span>
                    </Card.Text>
                    <Button onClick={() => addToCart(product)} variant="dark">
                      Add to cart
                    </Button>
                  </Card.Body>
                </Card>
                )
              }) : <span className="text-muted">There is no products</span>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
