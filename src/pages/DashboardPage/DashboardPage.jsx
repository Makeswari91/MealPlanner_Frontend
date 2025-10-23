import {useAuth} from "../../context/authContext/authContext";
import { useNavigate } from "react-router-dom";
import style from "../../components/AuthForms/Forms.module.css";


export default function DashboardPage(){
    const {logout} = useAuth();
    const nav = useNavigate();

    function handleLogout(){
        logout()
        nav('/auth')
    }
    return(
    <>
     <h1>Dashboard Page</h1>
     <button className={style.forms} onClick={handleLogout}>Logout</button>

</>
    )
}