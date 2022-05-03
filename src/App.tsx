import './App.css';
import { Cart } from './features/cart/components/Cart';
import { Header } from './features/Header';
import { ProductList } from './features/product/components/ProductList';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (    
    <><Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="checkout" element={<Cart />} />
      </Routes>
    </BrowserRouter></>
  )};
export default App;
