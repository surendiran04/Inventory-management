import Orders from '../pages/Orders/Orders.jsx'
import Add from '../pages/Add/Add'
import List from '../pages/List/List'
import Home from '../pages/Home/Home'
import LoginPopup from '../components/LoginPopUp/LoginPopup.jsx'

export const ROUTES = [
    {
      title: "LoginPopup",
      Component: LoginPopup,
      path: "/"
    }
]

export const Admin_ROUTES = [
    {
      title: "Home",
      Component: Home,
      path: "/home"
    },
    {
      title: "Add",
      Component:Add,
      path: "/add"
    },
    {
      title: "List",
      Component: List,
      path: "/list"
    },
    {
      title: "Orders",
      Component: Orders,
      path: "/orders"
    }
  ];

export const Supplier_ROUTES = [
    {
      title: "Add",
      Component: Add,
      path: "/add"
    }
]