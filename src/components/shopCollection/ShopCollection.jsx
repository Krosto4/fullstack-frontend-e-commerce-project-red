import headband from "./imgs/Headbands.png";
import earbuds from "./imgs/Earbuds.png";
import accessories from './imgs/Accessories.png'

export default function ShopCollection() {
  return (
    <>
      <section className="container my-5">
        <div className="d-flex align-items-center jusify-content-center gap-3">
          <div className="redBlock"></div>
          <span className="text-danger fw-bold">Featured</span>
        </div>
        <span className="fw-normal fs-1">Shop Collection</span>
        <div className="imgs flex-row container d-flex align-items-center jusify-content-center gap-4 my-5">
          <div className="">
            <img className="rounded w-100" src={headband}/>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center gap-4">
            <img className="rounded w-100" src={earbuds}/><img className="rounded w-100" src={accessories}/>
          </div>
        </div>
      </section>
    </>
  );
}
