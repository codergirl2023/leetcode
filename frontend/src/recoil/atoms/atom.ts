import {atom} from "recoil";

// const emailState = atom({
//     key: 'email', // unique ID (with respect to other atoms/selectors)
//     default: '', // default value (aka initial value)
// });
//
// const passwordState = atom({
//     key:'password',
//     default:''
// })


const authState = atom({
    key: "auth",
    default: {
        isAuthenticated: (localStorage.getItem('token') !== '')// Flag to indicate whether the user is authenticated or not
    },
});

export {authState};
