import React from 'react';
import {GoogleLogin} from 'react-google-login';

const clientId = '443266690930-4rlcdgcll13taeqm3ik5btkafof8k0vs.apps.googleusercontent.com';

const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
};

const onFailure = (res) => {
    console.log('[Login failed] res:', res);
};

function Login() {
    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;