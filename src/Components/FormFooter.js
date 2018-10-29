import React from 'react';
import * as Constants from './Constants';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    formFooter: {
        backgroundColor: '#f6f6f6',
        borderTop: '1px solid #b6b8b9',
        padding: 25,
        textAlign: 'center',
        borderRadius: '0 0 10px 10px'
    }
};

function createFooterLinks(links) {
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

function FormFooter(props) {
    const { classes } = props;

    return (
        <div className={classes.formFooter}>
            {createFooterLinks(Constants.footerLinks)}
        </div>
    );
}

export default withStyles(styles)(FormFooter);