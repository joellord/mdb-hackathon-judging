// import React from "react";
// import { Navigate, Route } from "react-router-dom";


// export function PrivateRoute({ component: Component, roles, ...rest }) {
//   const isAuthorized = () => API.userIsLoggedIn;

//   return (
//     <Route {...rest} render={props => {
//       return isAuthorized(roles) ? <Component {...props} /> : <Navigate to={{ pathname: "/" }} />
//     }} />
//   )
// }

import React from 'react';
import API from "../api";
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const auth = API.userIsLoggedIn();
    return auth ? <Outlet /> : <Navigate to="/" />;
}