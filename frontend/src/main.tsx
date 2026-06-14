import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFormElements,
  createRoutesFromElements,
} from "react-router";
import { CreateBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements()

<Route path = "/" element = {<App/>}/> 
);
createRoot(document.getElementById("root")!).render(

<RouterProvider router ={router}/>


);
