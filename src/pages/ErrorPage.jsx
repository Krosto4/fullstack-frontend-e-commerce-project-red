import { Link } from "react-router-dom"

export default function ErrorPage(){
    return(
        <>
            <section className="container">
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <h1 style={{fontSize: "100px"}} className="fw-bold text-danger">404</h1>
                    <p className="fs-3">Oops, error! Page not found <i class="bi bi-bug"></i></p>
                    <Link to={'/'} className="fw-normal text-muted">Go back home</Link>
                </div>
            </section>
        </>
    )
}