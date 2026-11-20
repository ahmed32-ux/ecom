
import { Routes, Route } from 'react-router-dom'

import Signup from './components/Signup'
import Login from './components/Login'

import AddProduct from './Admin/AddProduct'
import ProductList from './Admin/ProductList'
import EditProduct from './Admin/EditProduct'

import Home from './components/Home'
import About from './components/About'

import AddCategory from './Admin/AddCategory'
import CategoryList from './Admin/CategoryList'

function App() {
  return (
    <Routes>

      {/* Customer Store */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      {/* Authentication */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Panel */}
      <Route path="/admin/products" element={<ProductList />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/products/edit/:id" element={<EditProduct />} />

      {/* Category Management */}
      <Route path="/admin/categories/add" element={<AddCategory />} />
      <Route path="/admin/categories" element={<CategoryList />} />

    </Routes>
  )
}

export default App
