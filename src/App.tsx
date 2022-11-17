import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Carrello from "./pages/Carrello/Carrello";
import DettaglioProdotto from "./pages/DettaglioProdotto/DettaglioProdotto";
import Login from "./pages/Login/Login";
import NuovoProdotto from "./pages/NuovoProdotto/NuovoProdotto";
import Ordine from "./pages/Ordine/Ordine";
import Prodotti from "./pages/Prodotti/Prodotti";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveUser } from "./store/actionCreators";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Credentials } from "./pages/Login/Login";
import { RootState } from "./store/reducer/index";

function App() {
  const dispatch = useDispatch();
  const user: Credentials | null = useSelector(
    (state: RootState) => state.general.user
  );

  useEffect(() => {
    const actualUser = sessionStorage.getItem("cred");
    if (actualUser) dispatch(saveUser(JSON.parse(actualUser)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Prodotti />} />
              <Route path="/login" element={<Login />} />
              <Route path="/carrello" element={<Carrello />} />
              <Route path="/nuovo-prodotto" element={<NuovoProdotto />} />
              <Route path="/riepilogo-ordine" element={<Ordine />} />
              <Route
                path="/dettagli-prodotto"
                element={<DettaglioProdotto />}
              />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            draggablePercent={60}
          />
        </>
      ) : (
        <>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Prodotti />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            draggablePercent={60}
          />
        </>
      )}
    </div>
  );
}

export default App;
