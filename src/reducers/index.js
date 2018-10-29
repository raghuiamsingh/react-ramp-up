const planetState = {
    planet: {},
    loading: true
};

export function planetReducer(state = planetState, action) {
    switch (action.type) {
        case 'SET_PLANET_DATA': 
            return {
                planet: action.planetObj,
                loading: false
            };
        default:
            return state;
    }
}
