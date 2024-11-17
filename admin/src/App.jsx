import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes,Navigate, useNavigate } from 'react-router-dom'
// import Orders from './pages/Orders/Orders'
// import Add from './pages/Add/Add'
// import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Home from './pages/Home/Home'
import SupplierSidebar from './components/SupplierSidebar/SupplierSidebar.jsx'
import { ROUTES,Admin_ROUTES,Supplier_ROUTES } from './Routes/Routes.js';
import { StoreContext } from './Context/authContext.jsx';

const App = () => {
  const {isLoggedIn,decodedToken} = useContext(StoreContext)
  const userRoles = decodedToken?.role[0] ;
  const url = "http://localhost:4000";


  function renderRoutes() {
    return ROUTES.map((route, index) => (
      <Route
        key={`${route.title}-${index}`}
        Component={route.Component}
        path={route.path}
      />
    ));
  }

  function renderAdminRoutes() {
    return Admin_ROUTES.map((route, index) => (
      <Route
        key={`${route.title}-${index}`}
        Component={route.Component}
        path={`/admin${route.path}`}
      />
    ));
  }

  function renderSupplierRoutes() {
    return Supplier_ROUTES.map((route, index) => (
      <Route
        key={`${route.title}-${index}`}
        Component={route.Component}
        path={`/supplier${route.path}`}
      />
    ));
  }



  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr/>
        <Routes>
          {renderRoutes()}
          {(isLoggedIn && userRoles==="supplier") ?(renderSupplierRoutes()):(renderRoutes())}
          {(isLoggedIn && userRoles==="admin") ?(renderAdminRoutes()):(renderRoutes())}
          <Route Component={NotFound} path="*" />;
        </Routes>
    </div> 
  )
}

export default App
