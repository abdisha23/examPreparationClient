import {Navigate} from 'react-router-dom';

export const PrivateRoute = ({children}) =>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token !== undefined ? children : (<Navigate to="/login" replace={true}/>)

}