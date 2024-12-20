import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./views/pages/Login/Login";
import Signup from "./views/pages/Signup/Signup";
import FlightProcedure from "./views/pages/FlightProcedure/FlightProcedure";
import BookingConfirmation from "./components/BookingConfirmation/BookingConfirmation";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import PassengerInfoForm from "./components/PassengerInfoForm/PassengerInfoForm";
import Admin from "./views/pages/Admin/Admin";
import AuthRoute from "./AuthRoute";

const isAdmin = () => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    return parsedUser.type === 'admin';
  }
  return false;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/flight",
    element: <FlightProcedure />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/confirmation",
    element: <BookingConfirmation />,
  },
  {
    path: "/passenger-info",
    element: <PassengerInfoForm />,
  },
  {
    path: "/admin",
    element: <AuthRoute element={<Admin />} isAuthenticated={localStorage.getItem('token') !== null} isAdmin={isAdmin()} />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
