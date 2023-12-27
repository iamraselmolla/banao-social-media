import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import toast from 'react-hot-toast';

const ForgetPass = () => {
    const [message, setMessage] = useState(null)
    const [mail, setMail] = useState(null)
    const handleReset = async (e) => {
        e.preventDefault()
        if (!mail) {
            return toast.error("Please give email")
        }
        const response = await fetch('https://banao-social-media-server-mu.vercel.app/forget-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail }),
        });
        const data = await response.json()

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
                            <input onChange={(e) => setMail(e.target.value)} placeholder='email' name="email" type="email" className="form-control rounded-0 fw-bold py-3 text-muted" id="firstnameinput11" />
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