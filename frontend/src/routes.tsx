import { Route, Routes } from "react-router-dom";
import { EUserRoles } from "./@types/users";
import PrivateRoute from "./helpers/PrivateRoute";
import { Home } from "./pages/Home";
import { HomeAdmin } from "./pages/HomeAdmin";
import { Login } from "./pages/Login";
import { NotFount } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { Users } from "./pages/Users";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/session-expired" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/home" element={<PrivateRoute component={HomeAdmin} permissions={[EUserRoles["Funcionário"]]} />} />
            <Route path="/admin/users" element={<PrivateRoute component={Users} permissions={[EUserRoles["Funcionário"]]} />} />
            <Route path="*" element={<NotFount />} />
        </Routes>
    );
}

export default AppRoutes;
