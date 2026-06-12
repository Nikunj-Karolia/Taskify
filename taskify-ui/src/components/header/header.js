import { useNavigate } from "react-router-dom";

import HeaderCss from "./header.module.css";

function Header({children}){
    const navigate = useNavigate();
    async function handleLogout(e){
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/logout",{
                method: 'POST',
                credentials: "include",
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();
            if(!res.ok){
                console.error(json);
            }
        } catch (error) {
            console.error(error);
        }
        navigate("/");
    }
    return (
        <header className={HeaderCss.header}>
            <div>
                {children}
            </div>
            <div>
                <button className={HeaderCss.logout} onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
}

export default Header;