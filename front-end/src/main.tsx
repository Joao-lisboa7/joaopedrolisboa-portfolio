import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App';
import Home from './pages/home/home';
import './index.css'

const router = createBrowserRouter([
  { path: "/App", element: <App />},
  { path: "/", element: <Home />},
  { path: "*", element: <p>Rota não encontrada</p>,},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
