import {createSlice} from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
    isLoggedIn: false,
    name : name ? name : "" ,
    user : {
        name : "",
        email : "",
        phone : "" ,
        bio : "" ,
        photo : "" ,
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_LOGIN(state , action){
            state.isLoggedIn = action.payload;
        },
        SET_NAME(state, action){
            localStorage.setItem("name" , JSON.stringify(action.payload));
            state.name = action.payload;
        },
        SET_USER(state, action){
            const profile = action.payload ;
            state.user.name = profile.name;
            state.user.email = profile.email;
            state.user.phone = profile.bio;
            state.user.photo = profile.photo;
            state.user.bio = profile.bio;
        },

    }
});

export const {SET_LOGIN , SET_USER , SET_NAME} = authSlice.actions ;

export const selectisLoggedIn = (state)=> state.auth.isLoggedIn;
export const selectisName = (state)=> state.auth.name;
export const selectisUser = (state)=> state.auth.user;

export default authSlice.reducer;