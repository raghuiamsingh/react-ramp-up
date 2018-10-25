import React from 'react';
import FormHeader from '../Components/FormHeader';
import {apiFetch} from '../Components/ApiFetch';
import * as Constants from '../Components/Constants';
import { Redirect } from 'react-router-dom';
import LogoutButton from '../Components/LogoutButton';
import history from '../history';
import Loader from '../Components/Loader';
import * as Cookie from '../Components/Cookie';

class Planet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            planet: {},
            loading: true
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        Cookie.eraseCookie(Constants.sessionKeyName);
        history.push('/');
    }

    componentDidMount() {
        var planet_id = this.props.match.params.id;
        let planetData = [];
        apiFetch('planets', false, planet_id).then(function(jsonResponse) {
            planetData = jsonResponse;
        }).then(data => this.setState({ 
            planet: planetData,
            loading: false
        }));
    }

    normalizePlanetKey(string) {
        string = string.charAt(0).toUpperCase() + string.slice(1);
        string = string.replace(/_/g," ");
        string = string.toLowerCase().replace(
            /\b./g,
            function(a){
                return a.toUpperCase();
            }
        );
        return string;
    }

    renderPlanetDetails(planet) {
        let planetDet = [];
        for(var index in planet) {
            if ((typeof planet[index] === 'string' || planet[index] instanceof String) 
                && planet[index].indexOf('http') < 0) {
                planetDet.push(
                    <div key={index} className="planet-details">
                        <span className="details-key">{this.normalizePlanetKey(index)}: </span>
                        <span>{planet[index]}</span>
                    </div>
                );
            }
        }
        return planetDet;
    }

    render() {
        if (Cookie.getCookie(Constants.sessionKeyName) === null) {
            return <Redirect to="/" />;
        }

        var planet_id = this.props.match.params.id;

        let content;
        if (this.state.loading) {
            content = <Loader />;
        } else {
            content = <div className="wrapper fadeInDown">
                <LogoutButton 
                    buttonType="button"
                    buttonName="logout"
                    buttonClasses="logout-button right-float"
                    buttonValue="Logout"
                    buttonEvent={this.handleLogout}
                    showBackLink={true}
                />
                <div className="formContent">
                    <FormHeader classes="active" headerText={"Planet Details (ID: "+planet_id+")"} />
                    {this.renderPlanetDetails(this.state.planet)}
                </div>
            </div>;
        }

        return (
            content
        );
    };
}

export default Planet;
