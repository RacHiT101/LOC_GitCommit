import { Route, Routes, Navigate } from "react-router-dom"
import Homepage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";


const PublicRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
    </>
  )
}

export default PublicRouter
