import { createRoot } from 'react-dom/client'
import Home from './components/Home'
import "./assets/bulma.min.css"
import './style.css'
import About from './components/About'
import { BrowserRouter, Routes, Route } from 'react-router'
import Rewiews from './components/Rewiews'
import Cart from './components/Cart'
import Deliavery from './components/Deliavery'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rewiews" element={<Rewiews />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Deliavery" element={<Deliavery />} />
        </Routes>
    </BrowserRouter>
) 