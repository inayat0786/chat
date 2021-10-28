import { LOADING, TOKEN } from '../../types';
const initialState = {
    loading: false,
    TOKEN: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.value };
        case TOKEN:
            return { ...state, token: action.value };

        default:
            return state;
    }
}

export default reducer;