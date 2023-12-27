import React, { useContext, useState } from 'react';

import OtpInput from 'react-otp-input';
import { OtpContext } from './ForgetPass';

const Otp = () => {
    const [otp, setOtp] = useState('');
    const { email } = useContext(OtpContext)
    console.log(email)
    return (
        <div className="otp_container">
            <h2 className="">
                Please provide the otp we sent to
            </h2>
            <OtpInput
                shouldAutoFocus={true}
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input className='mx-3' {...props} />}
            />
        </div>
    );
};

export default Otp;