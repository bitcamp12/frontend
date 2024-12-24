import React, { useEffect, useState } from 'react';
import AppleLogo from "../../../assets/images/Google.png";
const LoginGoogle = () => {
    const restApikey = "332810267931-3v4gikheu6j8j2l1egm5to3o3opa57lf.apps.googleusercontent.com";
    const redirectUrl = `https://www.30ticket.shop/googleloding`;

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${restApikey}&scope=openid%20profile%20email&redirect_uri=https://www.30ticket.shop`;
const loginHandler = () => {
    window. location.href = googleAuthUrl;
    };





    return (
        <div onClick={loginHandler}>
            <img
                            src={AppleLogo}
                            alt="Apple Logo"
                            className="social-logo"
                        />
        </div>
    );
};

export default LoginGoogle;