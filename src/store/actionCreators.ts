import { POPOLA_PRODOTTI, SAVE_USER, LOGOUT, POPOLA_PRODOTTO_SELEZIONATO, POPOLA_CARRELLO, AGGIUNGI_NUOVO_PRODOTTO, AGGIUNGI_ALL_ORDINE, RIMUOVI_DAL_CARRELLO, SVUOTA_CARRELLO} from "./actionTypes";
import { Product } from "../interfaces/product";
import { Dispatch } from "react";
import { Credentials } from "../pages/Login/Login";
import { NewProduct } from "../pages/NuovoProdotto/NuovoProdotto";

export interface GeneralAction {
    type: string;
    payload: Product
}

//CHIAMO PRODOTTI DAL FILE JSON
export function chiamataProdotti(){
    return async (dispatch: Dispatch <GeneralAction>) => {
        try {
            const res = await fetch('prodotti.json')
            const data = await res.json();
            dispatch(popolaProdotti(data.prodotti));
        }
        catch (err) {
            console.log(err);
        }
        finally {
        } 
    }
}

//INERISCO PRODOTTI CHIAMATI IN ARRAY PRODOTTI NELLO STORE
export function popolaProdotti(prodotti: Product): GeneralAction{
    return{
      type: POPOLA_PRODOTTI, 
      payload: prodotti
    }  
}

//INSERISCO USER NELLO STORE
export function saveUser(user: Credentials){
    return{
        type: SAVE_USER,
        payload: user
    }
}

//ELIMINO LO USER DALLO STORE E MI SLOGGO
export function logout(){
    return{
        type: LOGOUT
    }
}


export function popolaProdottoSelezionato(idProdotto: number){
    return{
        type: POPOLA_PRODOTTO_SELEZIONATO, 
        payload: idProdotto
    }
}

//AGGIUNGO PRODOTTO NELL'ARRAY CARRELLO
export function popolaCarrello(elemento: Product){
    return{
        type: POPOLA_CARRELLO,
        payload: elemento
    }
}

//AGGIUNGO NUOVO PRODOTTO ALL'ARRAY PRODOTTI
export function aggiungiNuovoProdotto(nuovoProdotto: NewProduct) {
    return {
        type: AGGIUNGI_NUOVO_PRODOTTO,
        payload: nuovoProdotto
    }
}

//AGGIUNGO PRODOTTO ALL'ORDINE ACQUISTI 
export function aggiungiAllOrdine(elemento: Product[]){
    console.log(elemento);
    return{
        type: AGGIUNGI_ALL_ORDINE,
        payload: elemento 
    }
}

//RIMUOVO ELEMENTO DAL CARRELLO
export function rimuoviDalCarrello(idElemento: number){
    return{
        type: RIMUOVI_DAL_CARRELLO,
        payload: idElemento
    }
}

//SVUOTO ARRAY CARRELLO
export function svuotaCarrello(){
    return{
        type:SVUOTA_CARRELLO
    }
}