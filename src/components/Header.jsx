import { useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Header() {
  const { user, getUserAccount, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getUserAccount();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
  };

  function renderProfileMenu() {
    if (user) {
      return (
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>E-commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <div className="navbarElements">
                <div className="d-flex gap-3 align-items-center justify-content-center">
                  <Link to={"/"}>Home</Link>
                  <Link to={"/contact"}>Contact</Link>
                  <Link to={"/about"}>About</Link>
                  <Link className="btn btn-danger" to={"/shop"}>
                    Shop
                  </Link>
                </div>

                <div className="d-flex align-items-center justify-content-center searchInput mx-auto">
                  <input
                    placeholder="What are you looking for?"
                    className="headSearchInput"
                    type="text"
                  />
                  <i className="bi bi-search"></i>
                </div>

                <div className="logInOut mx-5 d-flex gap-3 align-items-center justify-content-center">
                  <Link to={"/cart"}>
                    <i className="bi bi-cart"></i>
                  </Link>
                  <Link to={"/profile"}>
                    <i className="bi bi-person"></i>
                  </Link>
                  <span>{user.username}</span>
                  <button onClick={handleLogout} className="btn btn-danger">
                    Log out
                  </button>
                </div>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } else {
      return (
        <Navbar expand="lg" className="">
          <Container>
            <Navbar.Brand>E-commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="navbarElements">
                <div className="mx-auto d-flex align-items-center justify-content-center gap-3">
                  <Link to={"/"}>Home</Link>
                  <Link to={"/contact"}>Contact</Link>
                  <Link to={"/about"}>About</Link>
                  <Link to={"/register"}>Sign up</Link>
                  <Link to={"/shop"}>Shop</Link>
                </div>

                <div className="d-flex align-items-center justify-content-center searchInput mx-auto">
                  <input
                    placeholder="What are you looking for?"
                    className="headSearchInput"
                    type="text"
                  />
                  <i className="bi bi-search"></i>
                </div>

                <div className="logInOut mx-5">
                  <Link to={"/login"} className="btn btn-danger">
                    Log in
                  </Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  }

  return (
    <>
      <div className="bg-danger text-white d-flex gap-2 p-3 align-items-center justify-content-center">
        <span>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
        <Link className="fw-bold text-decoration-underline" to={"/shop"}>
          Shop Now
        </Link>
      </div>
      {renderProfileMenu()}
    </>
  );
}
