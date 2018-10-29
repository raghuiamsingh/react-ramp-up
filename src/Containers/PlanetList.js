import React from 'react';
import * as Constants from '../Components/Constants';
import {apiFetch} from '../Components/ApiFetch';
import FormHeader from '../Components/FormHeader/FormHeader';
import LogoutButton from '../Components/LogoutButton';
import Loader from '../Components/Loader';
import { Redirect, Link } from 'react-router-dom';
import FormInput from '../Components/InputField';
import history from '../history';
import * as Cookie from '../Components/Cookie';

class PlanetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      searchTerm: '',
      loading: true
    };

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleSearchTextChange(filterText) {
    this.setState({
      searchTerm: filterText.target.value
    });
  }

  handleLogout() {
    Cookie.eraseCookie(Constants.sessionKeyName);
    history.push('/');
  }

  componentDidMount() {
    let planetsList = [];
    apiFetch('planets').then(function(jsonResponse) {
      for (var index in jsonResponse['results']) {
        var pUrl = jsonResponse['results'][index]['url'];
        pUrl = pUrl.split('/');
        planetsList.push({
          name: jsonResponse['results'][index]['name'],
          id: pUrl[pUrl.length - 2],
          population: jsonResponse['results'][index]['population']
        });
      }
    }).then(() => this.setState({
      planets: planetsList,
      loading: false
    }));
  }

  getPopulationColor(population) {
    let hue;
    var logOutput = Math.log10(population);
    let intensity;
    if (!isNaN(logOutput)) {
      hue = "360";
      intensity = Math.floor(5 * logOutput);
      if (intensity > 100) {
        intensity = 100;
      } else if (intensity < 0) {
        intensity = 0;
      }
      intensity = (100 - intensity) + "%";
    } else {
      hue = "195";
      intensity = "50%";
    }
    var saturation = "100%";

    return {
      backgroundColor: 'hsl('+hue+', '+saturation+', '+intensity+')'
    };
  }

  render() {
    if (Cookie.getCookie(Constants.sessionKeyName) === null) {
      return <Redirect to="/" />;
    }

    const searchTerm = this.state.searchTerm.toLowerCase();
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
        />
        <div className="formContent">
          <FormHeader classes="active" headerText="Planets List" />
          <FormInput 
            type="text" 
            classes="fadeIn second"
            name="search" 
            placeholder="Search a planet" 
            value={this.state.searchTerm}
            changeEvent={this.handleSearchTextChange}
          />
          <ul className="planet-list">
            {this.state.planets.map(planet => {
              var lowerName = planet.name.toLowerCase();
              if (lowerName.indexOf(searchTerm) === -1) {
                return '';
              }
              return (
                <li className="planet-item" style={this.getPopulationColor(planet.population)} key={planet.id}>
                  <Link to={'/planet/'+planet.id}>
                    {planet.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>;
    }
    return (
      content
    );
  }
}

export default PlanetList;
