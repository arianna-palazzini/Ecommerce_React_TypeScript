import "./Carrello.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer/index";
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/product";
import {
  aggiungiAllOrdine,
  rimuoviDalCarrello,
  svuotaCarrello,
} from "../../store/actionCreators";
import { toast } from "react-toastify";

function Carrello() {
  const carrello = useSelector((state: RootState) => state.general.carrello);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  function removeToCart(id: number) {
    dispatch(rimuoviDalCarrello(id));
    toast.error("Articolo rimosso dal carrello!");
  }

  function addToOrderlist(prodottiAcquistati: Product[]) {
    console.log(prodottiAcquistati);

    dispatch(aggiungiAllOrdine(prodottiAcquistati));
    toast.success("Acquisto avvenuto con successo!");
    //navigate('/');
    dispatch(svuotaCarrello());
  }

  return (
    <>
      <div className="navlink">
        <NavLink
          to={"/"}
          style={({ isActive }) => ({
            textDecoration: "none",
            fontSize: "large",
            color: "white",
          })}
        >
          &lt;
        </NavLink>
      </div>
      <div id="link-ordine">
        <NavLink
          to={"/riepilogo-ordine"}
          style={({ isActive }) => ({
            textDecoration: "none",
            fontSize: "large",
            color: "white",
          })}
        >
          Riepilogo Ordine
        </NavLink>
      </div>
      <div>
        <h2>Carrello</h2>
        {carrello.map((c) => (
          <div className="prodotto-in-carrello" key={c.title}>
            <img src={c.image} alt="" />
            <p>{c.title}</p>
            <p>Quantità: {c.quantita}</p>
            <button onClick={() => removeToCart(c.id)}>X</button>
          </div>
        ))}
      </div>
      <div>
        <h4>
          Totale: €{" "}
          {carrello
            .reduce((acc, el) => acc + el.price * el.quantita, 0)
            .toFixed(2)}
        </h4>
        <button id="btn-acquista" onClick={() => addToOrderlist(carrello)}>
          Acquista
        </button>
      </div>
    </>
  );
}

export default Carrello;
