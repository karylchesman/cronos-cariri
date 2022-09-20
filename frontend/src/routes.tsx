import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFount } from "./pages/NotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFount />} />
        </Routes>
    );
}

export default AppRoutes;
