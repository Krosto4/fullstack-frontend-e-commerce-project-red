import qrcode from "../assets/qrcode.jpg";
import googlePlay from "../assets/googlePlay.png";
import appStore from "../assets/appStore.png";

export default function Footer() {
  return (
    <>
      <div className="footerDiv">
        <section className="containerZ row">
          <div className="col firstBlock">
            <h4 className="exclusiveText">Exclusive</h4>
            <p className="fw-bold subscribeText">Subscirbe</p>
            <p>Get 10% off your first order</p>
            <div className="footerInputDiv row">
              <div className="col">
                <input
                  className="footerInput"
                  placeholder="Enter your email"
                  type="text"
                />
              </div>
              <div className="col">
                <i className="bi bi-send"></i>
              </div>
            </div>
          </div>
          <div className="col secondBlock">
            <p className="supportText fs-5">Support</p>
            <p className="fw-400" style={{ maxWidth: "170px" }}>
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className="fw-400">exclusive@gmail.com</p>
            <p className="fw-400">+88015-88888-9999</p>
          </div>
          <div className="col thirdBlock">
            <p className="accountText fs-5">Account</p>
            <p className="fw-400">My Account</p>
            <p className="fw-400">Login / Register</p>
            <p className="fw-400">Cart</p>
            <p className="fw-400">Wishlist</p>
            <p className="fw-400">Shop</p>
          </div>
          <div className="col fourthBlock">
            <p className="fs-5 qucklinkText">Quick Link</p>
            <p className="fw-400">Privacy Policy</p>
            <p className="fw-400">Terms Of Use</p>
            <p className="fw-400">FAQ</p>
            <p className="fw-400">Contact</p>
          </div>
          <div className="col fifthBlock">
            <p className="downloadText fs-5">Download App</p>
            <small className="">Save $3 with App New User Only</small>
            <div>
              <div className="imgs">
                <div className="qrcodeDiv">
                  <img width={"75px"} src={qrcode} />
                </div>
                <div className="storesDiv">
                  <img width={"120px"} src={googlePlay} />
                  <img width={"120px"} src={appStore} />
                </div>
              </div>
              <div className="row logos text-center my-3">
                <div className="col">
                  <i className="bi bi-facebook"></i>
                </div>
                <div className="col">
                  <i className="bi bi-twitter"></i>
                </div>
                <div className="col">
                  <i className="bi bi-instagram"></i>
                </div>
                <div className="col">
                  <i className="bi bi-linkedin"></i>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="text-center btn border-0 disabled">
            <span>© Copyright Rimel 2022. All right reserved</span>
          </div>
        </section>
      </div>
    </>
  );
}
