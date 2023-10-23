import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="lg:grid grid-cols-app antialiased h-full">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default App
