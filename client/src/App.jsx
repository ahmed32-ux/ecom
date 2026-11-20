
import { Routes, Route } from 'react-router-dom'

import Signup from './components/Signup'
import Login from './components/Login'
import AddProduct from './Admin/AddProduct'
import ProductList from './Admin/ProductList'
import EditProduct from './Admin/EditProduct'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path= "/admin/products" element={<ProductList/>} />
      <Route path= "/admin/products/add" element={<AddProduct/>} />
      <Route path= "/admin/products/edit/:id" element={<EditProduct/>} />

    </Routes>
  )
}

export default App
