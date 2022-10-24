import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import { Events } from "./pages/Events";
import { Home } from "./pages/Home";
import { HomeAdmin } from "./pages/HomeAdmin";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { Users } from "./pages/Users";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/session-expired" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/home" element={<PrivateRoute component={HomeAdmin} permissions={[""]} />} />
            <Route path="/admin/users" element={<PrivateRoute component={Users} permissions={[""]} />} />
            <Route path="/admin/events" element={<PrivateRoute component={Events} permissions={[""]} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
