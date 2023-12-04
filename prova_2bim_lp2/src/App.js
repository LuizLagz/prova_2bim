import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './template/Main'
import TelaCadastroUsuario from "./TelaCadastroUsuario";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/usuario" element={<TelaCadastroUsuario/>}/>
            <Route path="/batepapo"/>
            <Route path="/" element={<Main/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
