import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import { EventConfig } from "./pages/EventConfig";
import { Events } from "./pages/Events";
import { Home } from "./pages/Home";
import { HomeAdmin } from "./pages/HomeAdmin";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Permissions } from "./pages/Permissions";
import { Register } from "./pages/Register";
import { Roles } from "./pages/Roles";
import { Users } from "./pages/Users";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/session-expired" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/home" element={<PrivateRoute component={HomeAdmin} permissions={["SYSTEM_ADMIN"]} />} />
            <Route path="/admin/users" element={<PrivateRoute component={Users} permissions={["USER_LIST"]} />} />
            <Route path="/admin/events" element={<PrivateRoute component={Events} permissions={["EVENT_LIST"]} />} />
            <Route path="/admin/roles" element={<PrivateRoute component={Roles} permissions={["ROLE_LIST"]} />} />
            <Route path="/admin/permissions" element={<PrivateRoute component={Permissions} permissions={["PERMISSION_LIST"]} />} />
            <Route path="/event/new" element={<PrivateRoute component={EventConfig} permissions={["EVENT_CREATE"]} />} />
            <Route path="/event/config" element={<PrivateRoute component={EventConfig} permissions={["EVENT_CONFIG"]} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
