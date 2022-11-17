import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chiamataProdotti } from "../../store/actionCreators";
import Prodotto from "../Prodotto/Prodotto";
import { Product } from "../../interfaces/product";
import { Credentials } from "../Login/Login";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store/reducer/index";
import "./Prodotti.css";

function Prodotti() {
  const dispatch = useDispatch<any>();
  const products: Product[] = useSelector(
    (state: RootState) => state.general.prodotti
  );
  const user: Credentials | null = useSelector(
    (state: RootState) => state.general.user
  );

  useEffect(() => {
    if (products.length === 0) dispatch(chiamataProdotti());
  }, []);

  return (
    <>
      {user ? (
        <>
          <div id="container-prodotti">
            {products.map((el) => (
              <Prodotto key={el.id} {...el}></Prodotto>
            ))}
          </div>
          <div id="link-new">
            <NavLink
              to={"/nuovo-prodotto"}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "purple" : "grey",
                fontSize: "large",
              })}
            >
              Aggiungi nuovo prodotto
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div id="container-prodotti">
            {products.map((el) => (
              <Prodotto key={el.id} {...el}></Prodotto>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Prodotti;
