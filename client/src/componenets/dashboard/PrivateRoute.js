import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const PrivateRoute = ({children}) => {
    const {isLoggedIn} = useContext(AppContext);

    if(isLoggedIn){
        return children;
    }
    else{
        return <Navigate to={'/admin-login'}/>
    }
}

export default PrivateRoute