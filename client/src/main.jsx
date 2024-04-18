import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home/Home.jsx'
import NoMatch from './pages/NoMatch/NoMatch.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Login/Signup.jsx';
import Success from './pages/Order/Success.jsx';
import OrderHistory from './pages/Order/OrderHistory.jsx';
import {store} from './utils/store.js';
import Profile from './pages/MyAccount/Profile.jsx';
import SingleProductPage from './pages/ProductDetail/SingleProduct.jsx';
import { Provider } from 'react-redux';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/success',
        element: <Success />
      },
      {
        path: '/history',
        element: <OrderHistory />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/products/:id',
        element: <SingleProductPage />
      },
      {
        path: '*',
        element: <NoMatch />
      }
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <RouterProvider router={router} />
  </Provider>
)
