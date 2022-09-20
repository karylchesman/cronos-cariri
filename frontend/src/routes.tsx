import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFount } from "./pages/NotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/session-expired" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFount />} />
        </Routes>
    );
}

export default AppRoutes;
