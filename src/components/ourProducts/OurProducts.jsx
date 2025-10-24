import { Link } from 'react-router-dom';
import iphone from './imgs/iphone.png'

export default function OurProducts() {
  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="d-flex gap-3 align-items-center ">
            <div className="redBlock"></div>
            <span className="text-danger fw-bold">Our Products</span>
          </div>
          <span className="fs-1 fw-600">Special promotion</span>
        </div>
        <div style={{background: '#211c24'}} className="w-100 d-flex align-items-center justify-content-around gap-5 my-5">
            <div className='d-flex flex-column'>
                <span className='text-secondary fs-4 fw-600'>Pro.Beyond.</span>
                <div className='fs-1 d-flex gap-4'>
                    <span className='fw-lighter text-white fs-90px'>IPhone 14</span>
                    <span className='fw-bold text-white fs-90px'>Pro</span>
                </div>
                <p className='text-secondary fw-600'>
                    Created to change everything for the better. For everyone
                </p>
                <Link to={'/shop'} className='btn btn-outline-light w-25 p-2'>
                    <span className='fw-600'>Shop now</span>
                </Link>
            </div>
            <div>
                <img className='w-100' src={iphone}/>
            </div>
        </div>
      </section>
    </>
  );
}
