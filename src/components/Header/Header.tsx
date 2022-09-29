import { useSelector } from 'react-redux';
import { Credentials } from '../../pages/Login/Login';
import { StoreI } from '../../store/reducer';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actionCreators';
import './Header.css';
import {RootState} from '../../store/reducer/index';
import { Product } from '../../interfaces/product';
import { Navigate } from 'react-router-dom';




function Header(){

    const user: Credentials | null = useSelector((state:RootState) => state.general.user);
    const carrello: Product[] = useSelector((state:RootState) => state.general.carrello);
    const dispatch = useDispatch<any>();

    console.log(carrello);

    function eliminaUser(){
        dispatch(logout());
        sessionStorage.removeItem('cred');
        <Navigate to='/'/>
    }
    
    return(
        <header>
           {
                user ?
                    <>
                        <h2>Ecommerce</h2>
                       <NavLink to={'/carrello'}
                            style={({ isActive }) => ({
                                textDecoration: "none",
                                color: isActive ? "purple" : "white",
                                fontSize: "large"
                            })}> Carrello: {carrello.map((c)=>
                                 c.quantita).reduce((acc, el) => acc + el, 0)  
                                 } </NavLink>

                            <p>Ciao, {user.username}</p> 
                             <button id='logout' onClick={eliminaUser}>Logout</button>
                    </>
                    :
                    <>
                        <h2>Ecommerce</h2>
                        <NavLink to={'/login'}
                            style={({ isActive }) => ({
                                textDecoration: "none",
                                color: isActive ? "purple" : "white",
                                fontSize: "large"
                            })}>
                            Login</NavLink>
                    </>
            }
        </header>
    )
}

export default Header;