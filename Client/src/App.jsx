import { Route, Routes } from "react-router"
import LoginPage from "./components/LoginPage"
import Users from "./components/Users"
import "react-router"

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/register"
              element={<LoginPage/>}>
        </Route>
        <Route path="/users"
              element={<Users/>}>
        </Route>
      </Routes>
    </>
  )
}

export default App
