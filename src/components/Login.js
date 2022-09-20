import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [data,setData]=useState({email:"",password:""})
    const navigate = useNavigate()
    const handleSubmit =async(e)=>{
        e.preventDefault()
        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                console.log("ssssssssssssssssssss" ,process.env.URL);
                const response = await axios.post(`http://localhost:3333/auth`, data)
                console.log("ddddddddddddd",response?.data?.message);
                navigate("/login")
            } catch (err) {
                console.log(err.response.data.message);
            }
        }

    }
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    return (
        <section className="vh-100 bg-light">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                       <form onSubmit={handleSubmit}>
                       <div className="card shadow-2-strong" style={{borderRadius:"1rem"}}>
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Sign in</h3>
                                <div className="form-outline mb-4">
                                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" placeholder='Email' name="email" value={data.email} onChange={(e)=>handleChange(e)}/>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password"  className="form-control form-control-lg" placeholder='Password' name="password" value={data.password}  onChange={(e)=>handleChange(e)} />
                                </div>
                                <div className="form-check d-flex justify-content-start mb-4">
                                    <input className="form-check-input " type="checkbox" value="" id="form1Example3" />
                                    <label className="form-check-label ms-2" htmlFor="form1Example3"> Remember password </label>
                                </div>
                                <button className="btn btn-primary w-50 btn-lg btn-block" type="submit">Login</button>
                                <hr className="my-4" />
                                <span>Don't have an Account ? <Link to="/signup">signup</Link></span>
                            </div>
                        </div>
                       </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login