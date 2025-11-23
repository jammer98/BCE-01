import { Route, Routes } from "react-router"
import LoginPage from "./components/LoginPage"
import Users from "./components/Users"
import "react-router"
import HomePage from "./components/HomePage"
import SingleUser from "./components/SingleUser"
import UpdateUser from "./components/UpdateUser"

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/"
              element={<HomePage/>}>
        </Route>
        <Route path="/register"
              element={<LoginPage/>}>
        </Route>
        <Route path="/users"
                element={<Users/>}>
        </Route>
        <Route path="/users/:id"
                element={<SingleUser/>}>
        </Route>
        <Route path="/users/:id/edit"
                element={<UpdateUser/>}>
        </Route>
      </Routes>
    </>
  )
}

export default App
