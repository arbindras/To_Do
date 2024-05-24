import { useEffect, useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/ReactToastify.css"
import Header from "./partials/Header";

export default function Login() {
    const navigation = useNavigate()
    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            return navigation('/')
        }

    }, [navigation])

    const [errors, setErrors] = useState(null)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async () => {
        const result = await login(form);
        console.log("form", result)
        setErrors(null)

        if (result.status == 200) {
            if (result.data.status === 200) {
                localStorage.setItem('user', JSON.stringify(result.data.data))
                navigation('/')
                return;
            }
            if (result.data.status === 201) {
                setErrors(result.data.data)
                return;
            }
            if (result.data.status === 202) {
                toast(result.data.message)
                return;
            }
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <ToastContainer />
                <div className="row justify-content-md-center mt-4">
                    <div className="col-lg-5 card border-primary mt-4">
                        <div className="card-body">
                            <h4 className="card-title">Login Now</h4>

                            <div className="form-group">
                                <label className="form-label mt-4" htmlFor="exampleInputEmail1">
                                    Email or Username
                                </label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="username"
                                    className="form-control"
                                    placeholder="Enter Username or Email"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />
                                {
                                    errors?.username &&
                                    <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.
                                        {errors.username.msg}
                                    </small>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label mt-4" htmlFor="exampleInputEmail1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter Your Password"
                                    id="exampleInputEmail1"
                                />
                                {
                                    errors?.password && <small id="emailHelp" className="form-text text-muted">
                                        {errors.password.msg}
                                    </small>
                                }
                                <p>Password is required</p>
                            </div>

                            <div className=" row justify-content-md-center form-group mt-4">
                                <button
                                    type="button" onClick={handleSubmit}
                                    className="col-sm-6 btn btn-outline-secondary center"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}