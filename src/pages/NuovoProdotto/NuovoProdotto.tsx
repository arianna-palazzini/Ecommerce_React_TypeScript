import './NuovoProdotto.css'
import { NavLink } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { aggiungiNuovoProdotto } from '../../store/actionCreators';

const toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
}).then((data) => {
    return data
});

export interface NewProduct {
    [name: string]: string | number | undefined
}

function NuovoProdotto() {

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    //const fileRef = useRef();
    const fileRef = useCallback((node: any)=>{
        if(node)return node;
    }, []) 

    const [newProdotto, setNewProdotto] = useState<NewProduct>({
        title: '',
        description: '',
        price: 0
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const value = {
            ...newProdotto
        }
        value[event.target.id] = event.target.value
        setNewProdotto(value);
    }

    async function salvaProdotto() {
        const value : NewProduct = {
            ...newProdotto
        }
        //@ts-ignore
        const file = await toBase64(fileRef.current.file[0]) as string;
        value['image'] = file;

        if (value.title === '' || value.description === '' || value.price === 0 || value.scadenza === 0) {
            alert('Attenzione riempire tutti i campi!')
        } else {
            dispatch(aggiungiNuovoProdotto(value))
            alert('Prodotto aggiunto alla lista!');
            setTimeout(() => {
                navigate('/')
            }, 1500);
        }
    } 

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
            <div id='div-nuovo-prodotto'>
                <h2>Inserisci nuovo prodotto</h2>
                <form>
                    <label>Nome:</label>
                    <input id='title' type='text' value={newProdotto.title} onChange={handleChange} />
                    <label>Descrizione:</label>
                    <textarea id='description' value={newProdotto.description} onChange={handleChange} />
                    <label>Prezzo:</label>
                    <input id='price' type='number' value={newProdotto.price} onChange={handleChange} />
                    <label>Immagine:</label>
                    <input id='image' type='file' ref={fileRef} accept='image/png, image/gif, image/jpeg' /> 
                    <button type='button' onClick={salvaProdotto}>Salva</button> 
                </form>
            </div>
        </>

    )
}

export default NuovoProdotto;