import React from 'react';

class Icon extends React.Component {
    render() {
        return (
            <div className={this.props.classes}>
                <img src={this.props.imgSrc} className="icon" alt={this.props.altText} />
            </div>
        );
    }
}

export default Icon;
