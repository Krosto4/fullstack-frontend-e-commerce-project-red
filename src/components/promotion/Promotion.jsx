import { Link } from "react-router-dom";
import guy from "./imgs/blackGuy.png";

export default function Promotion() {
  return (
    <>
      <section>
        <div className="container">
          <div className="d-flex gap-3 align-items-center">
            <div className="redBlock"></div>
            <span className="text-danger fw-bold">Featured</span>
          </div>
          <span className="fs-1">Promotion</span>
        </div>

        <div className="d-flex">
          <div className="">
            <img className="w-100" src={guy} />
          </div>
          <div
            style={{ background: "#ffdd99" }}
            className="w-50 d-flex flex-column container align-items-start justify-content-center"
          >
            <small className="fw-bold text-primary">PROMOTION</small>
            <span className="fw-600 fs-1">Hurry up! 40% OFF</span>
            <p className="fw-normal my-2 fs-5">
              Thousands of high tech are waiting for you
            </p>
            <div className="my-2">
              <span>Offer expireds in:</span>
              <div className="d-flex align-items-center justify-content-center text-center my-2 gap-2">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="whiteBlock">02</div>
                  <small>Days</small>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="whiteBlock">12</div>
                  <small>Hours</small>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="whiteBlock">45</div>
                  <small>Minutes</small>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="whiteBlock">05</div>
                  <small>Seconds</small>
                </div>
              </div>
            </div>
            <Link to={'/shop'} className="btn btn-dark w-25">
                Shop now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
