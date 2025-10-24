export default function FeedbackCorner() {
  return (
    <>
      <section className="my-2">
        <div className="d-flex align-items-center justify-content-center my-5">
          <span className="fs-1 text-danger text-center ff-tnr fw-bold">
            Feedback Corner
          </span>
        </div>

        <div className="d-flex align-items-center justify-content-around container gap-3">
          <div className="shadow rounded jusify-content-start col p-2">
            <span className="fs-1 text-danger ff-tnr">“</span>
            <p className="text-danger ff-tnr fw-bold fs-5">Emily Wilson</p>
            <p className="fw-600">
              The customer experience was exceptional from start to finish. The
              website is user-friendly, the checkout process was smooth, and the
              clothes I ordered fit perfectly. I'm beyond satisfied!
            </p>
          </div>

          <div
            style={{ background: "#E075757A" }}
            className="shadow rounded jusify-content-start col p-2"
          >
            <span className="fs-1 text-danger ff-tnr">“</span>
            <p className="text-danger ff-tnr fw-bold fs-5">Sarah Thompson</p>
            <p style={{fontSize: '15.5px'}} className="fw-600">
              I absolutely love the quality and style of the clothing I
              purchased from this website. customer service was outstanding, and
              I received my order quickly. Highly recommended!
            </p>
          </div>

          <div className="shadow rounded jusify-content-start col p-4">
            <span className="fs-1 text-danger ff-tnr">“</span>
            <p className="text-danger ff-tnr fw-bold fs-5">Olivia Martinez</p>
            <p className="fw-600">
              I had a great experience shopping on this website. The clothes I
              bought are fashionable and comfortable. Highly satisfied!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
