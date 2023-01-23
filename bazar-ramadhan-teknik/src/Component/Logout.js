import React from 'react';
import {GoogleLogout} from 'react-google-login';

const clientId = '443266690930-4rlcdgcll13taeqm3ik5btkafof8k0vs.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        console.log('Logout made successfully');
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;