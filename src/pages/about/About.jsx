import "./aboutStyles.css";
import shopOnline from "./imgs/shoppingOnline.jpg";

import Emin from "./imgs/Emin Sadiqli.png";
import Nicat from "./imgs/Nicat Piriyev.png";
import Iman from "./imgs/Iman Imanov.png";

export default function About() {
  return (
    <>
      <section className="container">
        <p>
          <span className="text-muted">Home / </span>About
        </p>

        <div className="row">
          <div className="col-6 d-flex flex-column align-items-start justify-content-center">
            <h1>Our Story</h1>
            <p className="w-75">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region. <br /> <br />
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
          <div className="col-6">
            <img className="w-100" src={shopOnline} />
          </div>
        </div>

        <div className="workers d-flex flex-row align-items-center justify-content-around gap-2 my-4">
          <div>
            <img src={Emin} />
            <div>
              <h3>Emin Sadiqli</h3>
              <p>Founder & Chairman</p>
              <div className="d-flex flex-row align-items-center justify-content-start gap-2">
                <i className="bi bi-twitter"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-linkedin"></i>
              </div>
            </div>
          </div>

          <div>
            <img src={Iman} />
            <div>
              <h3>Iman Imanov</h3>
              <p>Managing Director</p>
              <div className="d-flex flex-row align-items-center justify-content-start gap-2">
                <i className="bi bi-twitter"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-linkedin"></i>
              </div>
            </div>
          </div>

          <div>
            <img src={Nicat} />
            <div>
              <h3>Nicat Piriyev</h3>
              <p>Product Designer</p>
              <div className="d-flex flex-row align-items-center justify-content-start gap-2">
                <i className="bi bi-twitter"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-linkedin"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
