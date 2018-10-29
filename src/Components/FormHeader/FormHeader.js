import React from 'react'
import * as styledComponents from './style-components';

class FormHeader extends React.Component {
    render() {
        return (
            <styledComponents.H2 className={this.props.classes}>
                {this.props.headerText}
            </styledComponents.H2>
        );
    }
}

export default FormHeader;
