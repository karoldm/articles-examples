import './App.css'
import "./App.css";
import { Cart } from "./components/Cart";
import { Products } from './components/Products';


function App() {
  return (
    <div style={{ display: "flex", gap: "64px" }}>
      <Products/>
      <Cart />
    </div>
  );
}

export default App;
