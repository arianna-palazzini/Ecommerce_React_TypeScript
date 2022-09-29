import { POPOLA_PRODOTTI, SAVE_USER, LOGOUT, POPOLA_PRODOTTO_SELEZIONATO, POPOLA_CARRELLO, AGGIUNGI_NUOVO_PRODOTTO, AGGIUNGI_ALL_ORDINE, RIMUOVI_DAL_CARRELLO, SVUOTA_CARRELLO } from "./actionTypes";
import { Product } from "../interfaces/product";
import { Credentials } from "../pages/Login/Login";

export interface StoreI {
    prodotti: Product[],
    user: Credentials | null,
    prodottoSelezionato: Product | null,
    carrello: Product[],
    ordine: Product[]
}

const initialStore: StoreI = {
    prodotti: [],
    user: null,
    prodottoSelezionato: null,
    carrello: [],
    ordine: []
}

function reducer(state = initialStore, action: any): StoreI {
    switch (action.type) {
        case POPOLA_PRODOTTI:
            return {
                ...state,
                prodotti: action.payload
            }
        case SAVE_USER:
            {
                sessionStorage.setItem('cred', JSON.stringify(action.payload))
                localStorage.setItem('credenziali', JSON.stringify(action.payload))
                return {
                    ...state,
                    user: action.payload
                }
            }

        case LOGOUT: {
            localStorage.removeItem('credenziali')
            return {
                ...state,
                user: null
            }
        }
        case POPOLA_PRODOTTO_SELEZIONATO:
            return {
                ...state,
                prodottoSelezionato: state.prodotti[action.payload]
            }
        case POPOLA_CARRELLO: {
            return {
                ...state,
                carrello: [...state.carrello, action.payload]
            }
        }
        case RIMUOVI_DAL_CARRELLO:
            return {
                ...state,
                carrello: state.carrello.filter(el => el.id !== action.payload)
            }
        case SVUOTA_CARRELLO:
            return {
                ...state,
                carrello: []
            }
        case AGGIUNGI_NUOVO_PRODOTTO:
            return {
                ...state,
                prodotti: [...state.prodotti, { ...action.payload, id: state.prodotti.length }]
            }
        case AGGIUNGI_ALL_ORDINE:
            return {
                ...state,
                ordine: [...action.payload]
            }
        default: return state;
    }
}

export default reducer;