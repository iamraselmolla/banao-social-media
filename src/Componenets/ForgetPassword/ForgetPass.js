import React, {useContext,useState} from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';

const ForgetPass = () => {
    const {handleResetPass} = useContext(AuthContext);
    const [message, setMessage] = useState(null)
    const handleReset = e => {
        e.preventDefault()
        setMessage(null)
        handleResetPass(e.target.email.value)
        .then(res => {
                setMessage(`A password reset mail has been sent to your ${e.target.email.value}`)
        })
        .catch(err => console.log(err.message))
    }
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="border px-3 py-4 border-success border-2">
                        <h2 className="fw-bolder">
                            Reset Password?
                        </h2>
                        <form onSubmit={handleReset}>
                            <input placeholder='email' name="email" type="email" className="form-control rounded-0 fw-bold py-3 text-muted" id="firstnameinput11" />
                            <label>Please input your account email to reset password</label>
                            <button type="submit" className="btn mt-3 py-3 w-100 rounded-5 fw-bold btn-success">Reset Password</button>
                            {message && <p className="fw-bolder text-success">{message}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;