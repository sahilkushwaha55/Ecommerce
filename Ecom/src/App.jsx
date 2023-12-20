import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './layout/Layout'
// import Home from './pages/Home'
// import ProductList from './pages/ProductList/ProductList'
// import Product from './pages/Product/Product'
// import Register from './pages/Register/Register'
// import Login from './pages/Login/Login'
// import Cart from './pages/Cart/Cart'
// import Admin from './pages/Admin/Admin'
// import AddProduct from './pages/Admin/AddProduct/AddProduct'
// import EditProduct from './pages/Admin/EditProduct/EditProduct'
// import EditProfile from './pages/EditProfile/EditProfile'
// import SearchPage from './pages/SearchPage/SearchPage'
// import WhiteList from './pages/WhiteList/WhiteList'
import { Suspense, lazy } from 'react'

const Home = lazy(() => import('./pages/Home'))
const ProductList = lazy(() => import('./pages/ProductList/ProductList'))
const Product = lazy(() => import('./pages/Product/Product'))
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'))
const WhiteList = lazy(() => import('./pages/WhiteList/WhiteList'))
const Register = lazy(() => import('./pages/Register/Register'))
const Login = lazy(() => import('./pages/Login/Login'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const Admin = lazy(() => import('./pages/Admin/Admin'))
const AddProduct = lazy(() => import('./pages/Admin/AddProduct/AddProduct'))
const EditProduct = lazy(() => import('./pages/Admin/EditProduct/EditProduct'))
const EditProfile = lazy(() => import('./pages/EditProfile/EditProfile'))


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Suspense fallback={<h1>Loading...</h1>}><Home /></Suspense>} />
      <Route path=':category' element={<Suspense fallback={<h1>Loading...</h1>}><ProductList /></Suspense>} />
      <Route path='product/:id' element={<Suspense fallback={<h1>Loading...</h1>}><Product /></Suspense>} />
      <Route path='register' element={<Suspense fallback={<h1>Loading...</h1>}><Register /></Suspense>} />
      <Route path='user/:id' element={<Suspense fallback={<h1>Loading...</h1>}><EditProfile /></Suspense>} />
      <Route path='login' element={<Suspense fallback={<h1>Loading...</h1>}><Login /></Suspense>} />
      <Route path='cart' element={<Suspense fallback={<h1>Loading...</h1>}><Cart /></Suspense>} />
      <Route path='whitelist' element={<Suspense fallback={<h1>Loading...</h1>}><WhiteList /></Suspense>} />
      <Route path='search' element={<Suspense fallback={<h1>Loading...</h1>}><SearchPage /></Suspense>} />
      <Route path='admin' element={<Suspense fallback={<h1>Loading...</h1>}><Admin /></Suspense>} />
      <Route path='admin/addproduct' element={<Suspense fallback={<h1>Loading...</h1>}><AddProduct /></Suspense>} />
      <Route path='admin/:id' element={<Suspense fallback={<h1>Loading...</h1>}><EditProduct /></Suspense>} />
    </Route>
  )
)

function App() {

  return <RouterProvider router={router} />
}

export default App
