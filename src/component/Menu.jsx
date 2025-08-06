import React from 'react'
import { useNavigate } from 'react-router-dom'


export const Menu = ({auth}) => {

    const navigate = useNavigate()

    const logOut = ()=>{

        localStorage.removeItem("token")
        auth(false)
        navigate('/')

    }


    
  return (
       <>
            <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/person">Contact List</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="/employee">Home
                                    <span className="visually-hidden">(current)</span>
                                </a>
                            </li>
                            
                        </ul>
                        <div className="d-flex">
                            <button 
                                onClick={logOut}
                                className="btn btn-secondary my-2 my-sm-0" >
                                Log Out</button>
                        </div>
                    </div>
                </div>
            </nav>

        </>
  )
}
