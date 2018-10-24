import React from 'react';

class FormInput extends React.Component {
    render() {
        return (
            <input 
                type={this.props.type}
                defaultValue={this.props.value}
                name={this.props.name}
                className={this.props.classes}
                placeholder={this.props.placeholder}
                onChange={this.props.changeEvent}
            />
        );
    }
}

export default FormInput;
