import React from 'react';
import { Link } from 'react-router-dom';

class LogoutButton extends React.Component {
    renderBackLink() {
        if (this.props.showBackLink) {
            return (
                <Link to={'/planets'}>
                    {"< Go back"}
                </Link>
            );
        }
    }

    render() {
        return (
            <div className="logout-button-holder">
                {this.renderBackLink()}
                <input 
                    type={this.props.buttonType}
                    name={this.props.buttonName}
                    className={this.props.buttonClasses}
                    value={this.props.buttonValue}
                    onClick={this.props.buttonEvent}
                />
            </div>
        );
    }
}

export default LogoutButton;
