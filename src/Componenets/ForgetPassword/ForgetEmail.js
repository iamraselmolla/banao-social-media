import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { OtpContext } from './ForgetPass';


const ForgetEmail = () => {
    const [mailInpugt, setMailInput] = useState()
    const { setEmail, setPage } = useContext(OtpContext)


    const handleReset = async (e) => {

        e.preventDefault()
        setEmail(mailInpugt)
        setPage('otp')
        return

        // if (!mail) {
        //     return toast.error("Please give email")
        // }
        // const otp = Math.floor(Math.random() * 9000 + 1000)
        // const response = await fetch('https://banao-social-media-server-mu.vercel.app/forget-password', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ mail }),
        // });
        // const data = await response.json()

    }
    return (
        <form onSubmit={handleReset}>
            <input onChange={(e) => setMailInput(e.target.value)} placeholder='email' name="email" type="email" className="form-control rounded-0 fw-bold py-3 text-muted" id="firstnameinput11" />
            <label>Please input your account email to reset password</label>
            <button type="submit" className="btn mt-3 py-3 w-100 rounded-5 fw-bold btn-success">Reset Password</button>
            <p className="fw-bolder text-success"></p>
        </form>
    );
};

export default ForgetEmail;