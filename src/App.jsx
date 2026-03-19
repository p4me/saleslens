import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Deals from './pages/Deals'
import Reps from './pages/Reps'
import RepDetail from './pages/RepDetail'
import Analytics from './pages/Analytics'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,          element: <Dashboard /> },
      { path: 'deals',        element: <Deals /> },
      { path: 'reps',         element: <Reps /> },
      { path: 'reps/:id',     element: <RepDetail /> },
      { path: 'analytics',    element: <Analytics /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
