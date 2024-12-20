import React from "react";
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
import ReturnPage from "./components/ReturnPage/ReturnPage";
import PageNews from "./views/pages/PageNews/PageNews";
import Admin from "./views/pages/Admin/Admin";
import User from "./views/pages/User/User";

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
    path: "/returnflight",
    element: <ReturnPage />,
  },
  {
    path: "/news",
    element: <PageNews />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/user",
    element: <User />,
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
