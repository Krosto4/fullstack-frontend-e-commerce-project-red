import { useContext } from 'react'
import './userDetailsStyles.css'
import AuthContext from '../../components/AuthContext'
import { Link } from 'react-router-dom'

export default function UserDetails(){
    const {user} = useContext(AuthContext)
    return(
        <>
            <section className='container d-flex align-items-start justify-content-center flex-column'>
                <Link className='btn btn-danger' to={'/'}>My products for sale</Link>
                <div className='userDataDiv w-100 p-4 my-4'>
                    <h1 className='text-danger'>User Details</h1>
                    <h2>Name: <span className='fw-400'>{user.name}</span></h2>
                    <h2>Surname: <span className='fw-400'>{user.surname}</span></h2>
                    <h2>Email: <span className='fw-400'>{user.email}</span></h2>
                    <h2>Username: <span className='fw-400'>{user.username}</span></h2>
                </div>
            </section>
        </>
    )
}