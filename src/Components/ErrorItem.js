import React from 'react';

class ErrorItem extends React.Component {
    render() {
        return (
            <p className="error-item">Wrong Credentials, please try again.</p>
        );
    }
}

export default function CredentialsError(props) {
    if (props.isLoggedIn) {
      return <ErrorItem />;
    }
    return null;
}
