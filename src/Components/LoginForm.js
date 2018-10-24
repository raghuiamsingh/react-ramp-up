import React from 'react';
import FormInput from './InputField';
import CredentialsError from './ErrorItem';
import {apiFetch} from './ApiFetch';
import * as Constants from './Constants';
import Loader from './Loader';
import history from '../history';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        var currentErrors = this.state.errors.slice();
        if (!formData.get('name')) {
            currentErrors.nameError = true;
        }

        if (!formData.get('birth_year')) {
            currentErrors.birthError = true;
        }

        this.setState({
            loading: true
        });

        window.sessionStorage.removeItem(Constants.sessionKeyName);

        apiFetch('people').then(function(jsonResponse) {
            let credentialsVerified = false;
            for (var index in jsonResponse['results']) {
                if (jsonResponse['results'][index]['name'] == formData.get('name') 
                    && jsonResponse['results'][index]['birth_year'] == formData.get('birth_year')) {
                    credentialsVerified = true;
                    break;
                }
            }
            if (credentialsVerified) {
                currentErrors.wrongCredentials = false;
                window.sessionStorage.setItem(
                    Constants.sessionKeyName,
                    JSON.stringify(jsonResponse['results'][index])
                );
            } else {
                currentErrors.wrongCredentials = true;
            }
        }).then(data => {
            this.setState({
                errors: currentErrors,
                loading: false
            });
            if (!currentErrors.wrongCredentials) {
                history.push('/planets');
            }
        });

        this.setState({
            errors: currentErrors
        });
    }
    
    render() {
        let submitButton;
        if (this.state.loading) {
            submitButton = <Loader loaderColor="#2a5082" withoutWrapper={true} />;
        } else {
            submitButton = <FormInput 
                type="submit" 
                classes="fadeIn fourth" 
                name="submit" 
                value="Log In" 
            />;
        }
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                <FormInput 
                    type="text" 
                    classes={"fadeIn second" + (this.state.errors.nameError ? ' errorField' : '')}
                    name="name" 
                    placeholder="Name" 
                    value=""
                />
                <FormInput 
                    type="text" 
                    classes={"fadeIn third" + (this.state.errors.birthError ? ' errorField' : '')}
                    name="birth_year" 
                    placeholder="Birth Year" 
                    value="" 
                />
                <CredentialsError isLoggedIn={this.state.errors.wrongCredentials} />
                {submitButton}
            </form>
        );
    }
}

export default LoginForm;
