import { useNavigate } from "react-router-dom";

import HeaderCss from "./header.module.css";

function Header({children}){
    const navigate = useNavigate();
    function handleLogout(e){
        e.preventDefault();
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