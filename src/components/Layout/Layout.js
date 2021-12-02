import { Route, Redirect } from 'react-router-dom';
import Navigation from  '../Navigation/Navigation';
import { useSelector} from 'react-redux';
import {selectCurrentUser} from '../../Auth/authSlice';

const Layout = ({exact, path, component: Component})=>{


    const currentUser = useSelector(selectCurrentUser)

    return <Route
        exact={exact}
        path={path}
        render={()=>{
            const userPages = <>
                <Navigation/>
                <main> 
                    <Component/>    
                </main>            
            </>
            
            if (currentUser) return userPages;
            return <Redirect to='/login'/>
        }}
    />
}


export default Layout 
