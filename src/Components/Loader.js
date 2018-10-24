import React from 'react';
import ReactLoading from "react-loading";

class Loader extends React.Component {
    render() {
        let loaderColor;
        if (this.props.loaderColor) {
            loaderColor = this.props.loaderColor;
        } else {
            loaderColor = "#fff";
        }

        let loaderContent;
        if (this.props.withoutWrapper) {
            loaderContent = <ReactLoading type="bubbles" color={loaderColor} height={'20%'} width={'20%'} className="app-loader"/>;
        } else {
            loaderContent = <div className="wrapper fadeInDown">
                <ReactLoading type="bubbles" color={loaderColor} height={'20%'} width={'20%'} className="app-loader"/>
            </div>;
        }
        return (
            loaderContent
        );
    }
}

export default Loader;
