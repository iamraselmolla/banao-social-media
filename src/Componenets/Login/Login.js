import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [showLoading, setShowLoading] = useState(false)
    const navigate = useNavigate();



    return (
        <div className="container py-5">
            <div className="register-user pb-2 px-4 pt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-part">
                            <h3 className="fw-bold mb-3">
                                Welcome Back !
                            </h3>
                            <div className="register-user-form">
                                <form>
                                    <div className="row">
                                        <input name='username' placeholder='Username' type="text" className="form-control rounded-0 fw-bold py-3  border-bottom-none text-muted" id="emailinput" />
                                    </div>
                                    <div className="row">
                                        <input name='password' placeholder='Password' type="password" className="form-control rounded-0 fw-bold py-3  text-muted" id="passinputlogin" />
                                    </div>
                                    <div className="row">
                                        {!showLoading && <button type="submit" className="btn mt-3 py-2 w-100 rounded-5 fw-bold btn-success">Log in</button>}

                                        {showLoading && <button class="btn mt-3 py-2 w-100 rounded-5 fw-bold btn-success" type="button" disabled>
                                            <span class="spinner-border me-2 spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Please Wait...
                                        </button>}
                                    </div>
                                </form>

                                <p className="fw-bolder">
                                    Forget Password? <Link className='text-decoration-none text-success' to="/forget-password">reset!</Link>
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <p className="mb-0">
                            Not have an Account? <Link to="/register" className='text-success text-decoration-none fw-bold'>Please Register First</Link>
                        </p>
                        <img src="register.png" className='img-fluid' alt="Register user" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;