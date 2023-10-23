import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext.tsx'

import GuestSignUp from './routes/GuestSignUp.tsx'
import SignIn from './routes/SignIn.tsx'
import Dashboard from './routes/Dashboard.tsx'
import EmployeeSignUp from './routes/EmployeeSignUp.tsx'
import Employees from './routes/Employees.tsx'
import Companies from './routes/Companies.tsx'
import NewEmployee from './routes/NewEmployee.tsx'
import NewCompany from './routes/NewCompany.tsx'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: 'employees',
        element: <Employees />
      },
      {
        path: '/employee/:id',
        element: <NewEmployee />
      },
      {
        path: 'newEmployee',
        element: <NewEmployee />
      },
      {
        path: 'companies',
        element: <Companies />
      },
      {
        path: '/company/:id',
        element: <NewCompany  />
      },
      {
        path: 'newCompany',
        element: <NewCompany />
      },
    ]
  },
  {
    path: 'guestSignUp',
    element: <GuestSignUp />,
  },
  {
    path: 'employeeSignUp',
    element: <EmployeeSignUp />,
  },
  {
    path: 'signIn',
    element: <SignIn />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
)
