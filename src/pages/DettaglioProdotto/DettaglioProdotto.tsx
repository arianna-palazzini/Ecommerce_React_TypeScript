import './DettaglioProdotto.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';


function DettaglioProdotto(){

    const prodottoSelezionato = useSelector((state: RootState) => state.general.prodottoSelezionato)

    return(
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
            <h2>Dettagli Prodotto</h2>

            <div id='div-dettagli-prodotto'>
                <img src={prodottoSelezionato?.image} />
                <div id="info-prodotto">
                    <label>{prodottoSelezionato?.title}</label>
                <label>Descrizione:</label>
                <span>{prodottoSelezionato?.description}</span> 
                </div>
            </div>
        </>
    )
}

export default DettaglioProdotto;