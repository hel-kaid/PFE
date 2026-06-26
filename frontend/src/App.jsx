import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Layout from "./layouts/Layout";
import Layout1 from "./layouts/Layout1";
import ProtectedRoute from "./route/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import PythonRpgPage from "./pages/PythonRpgPage";
import SnakePage from "./pages/SnakePage";
import RobozzleLevelsPage from "./pages/RobozzleLevelsPage";
import RobozzleGamePage from "./pages/RobozzleGamePage";
export default function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout1 />}>
                    <Route
                        path="/snake"
                        element={<SnakePage />}
                    />
                    <Route path="/python-rpg" element={<PythonRpgPage />} />
                    <Route path="/profile/edit" element={<EditProfile />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/robozzle"
                        element={<RobozzleLevelsPage />}
                    />

                    <Route
                        path="/robozzle/stage/:stageId"
                        element={<RobozzleGamePage />}
                    />
                </Route>
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}