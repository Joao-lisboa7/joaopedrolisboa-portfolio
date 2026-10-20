import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Home from './pages/home/home';
import About from './pages/about/About';
import Experiences from './pages/experiences/Experiences';
import Statistics from './pages/statistics/Statistics';
import './styles/index.css';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/experiences', element: <Experiences language={'pt'} /> },
  { path: '/statistics', element: <Statistics language={'pt'} /> },
  { path: '/App', element: <App /> },
  { path: '*', element: <p>Rota não encontrada</p> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
