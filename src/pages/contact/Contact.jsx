import "./contactStyles.css";

export default function Contact() {
  return (
    <>
      <section className="container my-5">
        <p>
          <span className="text-muted">Home / </span>Contact
        </p>

        <div className="row">
          <div className="col-4 shadow rounded container">
            <div className="d-flex flex-column align-items-start p-4">
              <div className="d-flex gap-2 align-items-center justify-content-center">
                <i className="bi bi-telephone btn btn-danger round50"></i>
                <span className="fw-bold fs-4">Call to us</span>
              </div>
              <div className="my-4">
                <p>We are available 24/7, 7 days a week.</p>
                <p>Phone: +8801611112222</p>
              </div>
            </div>
            <hr />
            <div className="d-flex flex-column align-items-start p-4">
              <div className="d-flex gap-2 align-items-center justify-content-center">
                <i className="bi bi-envelope btn btn-danger round50"></i>
                <span className="fw-bold fs-4">Write to US</span>
              </div>
              <div className="my-4">
                <p>
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p>Emails: customer@exclusive.com</p>
                <p>Emails: support@exclusive.com</p>
              </div>
            </div>
          </div>
          <div className="col-7 shadow rounded container d-flex flex-column align-items-center justify-content-center gap-4">
            <div className="d-flex align-items-center justify-content-center">
              <input
                className="inputStyles p-2"
                type="text"
                placeholder="Your Name"
              />
              <input
                className="inputStyles p-2"
                type="text"
                placeholder="Your Email"
              />
              <input
                className="inputStyles p-2"
                type="text"
                placeholder="Your Phone"
              />
            </div>
            <div className="d-flex flex-column gap-4">
              <textarea
                placeholder="Your Message"
                className="inputStyles p-2 h-200px w-600px"
              ></textarea>
              <div className="d-flex align-items-end justify-content-end">
                <button className="btn btn-danger w-25 p-2">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
