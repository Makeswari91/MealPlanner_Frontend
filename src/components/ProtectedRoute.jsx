import { Outlet } from "react-router-dom";
import {useAuth} from "../context/authContext/authContext";
import AuthPage from "../pages/AuthPage/AuthPage"

export default function ProtectedRoute(){
    const {cookies} = useAuth();

    return cookies.token ? <Outlet /> :  <AuthPage />
}