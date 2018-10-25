import * as Constants from './Constants';

export function apiFetch(fetchParam, fullUrl = false, id = false) {
    let fetchItem;

    let apiUrl;

    if (fullUrl) {
        apiUrl = fetchParam;
    } else {
        switch (fetchParam) {
            case 'people': {
                fetchItem = Constants.apiPeople;
                break;
            }
            case 'planets': {
                fetchItem = Constants.apiPlanets;
                break;
            }
            default: {
                fetchItem = Constants.apiPlanets;
            }
        }
        apiUrl = Constants.apiBaseUrl + fetchItem + '/';
        apiUrl += id ? (id + '/') : '';
        apiUrl += Constants.apiFormat;
    }

    return fetch(apiUrl, {
        method: Constants.fetchMethod,
        cache: Constants.apiNoCache
    })
    .then(response => response.json())
    .catch(error => console.error('Error in API:', error));
}
