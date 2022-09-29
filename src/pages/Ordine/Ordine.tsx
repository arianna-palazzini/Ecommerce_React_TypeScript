import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store/reducer/index';
import './Ordine.css'

function Ordine() {

    const ordine = useSelector((state: RootState) => state.general.ordine)

    
    return (
        <>
            <div className='navlink'>
                <NavLink to={'/'}
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        fontSize: "large",
                        color: "white"
                    })}>
                    &lt;</NavLink>
            </div>
            {
                ordine ?
                    <div>
                        <h2>Riepilogo Ordine</h2>
                        {
                            ordine.map(o =>
                                <div className='prodotto-in-ordine' key={o.id}>
                                    <p>Id: {o.id}</p>
                                    <img src={o.image} />
                                    <p>{o.title}</p>
                                    <p>Quantità: {o.quantita}</p>
                                    
                                </div>)
                        }
                    <h4>Totale: € {ordine.reduce((acc, el) => acc + el.price * el.quantita, 0).toFixed(2)}</h4>
                    </div>
                    :
                    <div>
                        <h2>Nessun ordine!</h2>
                    </div>
            } 
        </>
    )
}

export default Ordine;