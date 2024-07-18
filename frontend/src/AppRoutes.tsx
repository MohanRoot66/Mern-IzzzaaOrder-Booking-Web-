import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthcallBackProvide from "./auth/AuthcallBackProvide";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
// import App from "./App"

const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Layout showHero><HomePage /></Layout>} />
            <Route path="/auth-callback" element={<AuthcallBackProvide />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<Layout>
                    <UserProfilePage />
                </Layout>} />
            </Route>
            <Route path="*" element={<Navigate to={"/"} />}/>
        </Routes>
    )
}

export default AppRoutes;