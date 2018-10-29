import React from 'react';

class FormHeader extends React.Component {
    render() {
        return (
            <h2 className={this.props.classes}>{this.props.headerText}</h2>
        );
    }
}

export default FormHeader;
