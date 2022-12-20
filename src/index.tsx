import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { useAtomsDevtools } from 'jotai/devtools';
import Root from './pages/Root';
import Dashboard from './pages/Dashboard';
import DashboardSegment from './pages/DashboardSegment';
import About from './pages/About';
import Post from './pages/Post';
import { render } from '@testing-library/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const AtomsDevtools = ({ children }: any) => {
  useAtomsDevtools('app');
  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />}>
        <Route path=":id" element={<DashboardSegment />}></Route>
      </Route>
      <Route path="about" element={<About />}></Route>
      <Route path="post" element={<Post />}></Route>
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <Suspense fallback={<></>}>
      <AtomsDevtools>
        <App />
      </AtomsDevtools>
    </Suspense> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
