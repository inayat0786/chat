import { SET_IMAGES, LOGIN, LOGOUT, SET_LOADER, RETRIEVE_TOKEN } from '../../types/auth';
const initialState = {

    images: null,
    isLoading: true,
    userName: null,
    userToken: null,
    loader: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMAGES:
            return { ...state, images: action.value };
        case LOGIN:
            return {
                ...state,
                userName: action.id,
                userToken: action.token,
                isLoading: false,
            };
        case LOGOUT:
            return {
                ...state,
                userName: null,
                userToken: null,
                isLoading: false,
            };
        case SET_LOADER:
            return {
                ...state,
                loader: action.value
            };
        case RETRIEVE_TOKEN:
            return {
                ...state,
                userToken: action.token,
                isLoading: false,
            };
        default:
            return state;
    }
}
export default reducer;
