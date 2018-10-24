import React, { Component } from 'react';

class FormFooter extends React.Component {
    createFooterLinks(links) {
        let footerLinks = [];
        for (let key in links) {
            footerLinks.push(
                <a 
                    className={links[key].classes}
                    href={links[key].link}
                    key={key}
                >
                    {links[key].title}
                </a>
            );
        }
        return footerLinks;
    }

    render() {
        return (
            <div className="formFooter">
                {this.createFooterLinks(this.props.contents)}
            </div>
        );
    }
}

export default FormFooter;
