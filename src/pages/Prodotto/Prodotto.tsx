import './Prodotto.css';
import { Credentials } from '../Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../store/reducer/index';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { popolaCarrello, popolaProdottoSelezionato } from '../../store/actionCreators';
import { Product } from '../../interfaces/product';
import { toast } from 'react-toastify';

function Prodotto(props: any) {

    const user: Credentials | null = useSelector((state: RootState) => state.general.user);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const [quantita, setQuantita] = useState<number>(0);

    function viewDetail(idProdotto: number){
        dispatch(popolaProdottoSelezionato(idProdotto));
        navigate('/dettagli-prodotto')
    }

    function addToCart(elemento: Product){
        const newElemento = {...elemento, quantita: quantita}
        //console.log(elemento);
        dispatch(popolaCarrello(newElemento));
        toast.success('Articolo aggiunto al carrello!');
    }

    return (
        <div id="prodotto">
        {
            user ?
                <>
                    <img src={props.image} />
                    <h4>{props.title}</h4>
                    <p>{props.description.substr(0, 150)}</p>
                    <button id='btn-details' onClick={()=> viewDetail(props.id)}>Dettaglio</button>
                    <div className='specifiche-prodotto'>
                        <p>€ {props.price}</p>
                        <select value={props.quantita}
                            onChange={(e) => setQuantita(parseInt(e.target.value))}>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                        <button onClick={()=> addToCart(props)}>Aggiungi al carrello</button>
                    </div>

                </>
                :
                <>
                    <img src={props.image} />
                    <h4>{props.title}</h4>
                    <p>{props.description.substr(0, 150)}</p>
                    <div className='specifiche-prodotto'>
                      <p>€ {props.price}</p>   
                    </div>
                   
                </>
        }

    </div>
    )
}

export default Prodotto;