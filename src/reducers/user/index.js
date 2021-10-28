import { USER_DATA } from '../../types/auth';
const initialState = {

    data: []
}
const userReducer = (state = initialState, action) => {
    console.log('user reducer', action)
    switch (action.type) {
        case USER_DATA:
            return { ...state, data: action.value };
        default:
            return state;
    }
}
export default userReducer;
