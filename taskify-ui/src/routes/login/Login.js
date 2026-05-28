import { Link, useNavigate } from "react-router-dom";

import LoginCss from "./Login.module.css";

import AuthInput from "../../components/authinput/input";
import AuthButton from "../../components/authbutton/button";

function Login(){
    const navigate = useNavigate();
    function handleFormSubmit(e){
        e.preventDefault();
        const formElem = e.target;
        const formData = new FormData(formElem);
        const formObject = Object.fromEntries(formData.entries());
        // handle Api call here
        
        try{
            const res = await fetch("http://localhost:5000/api/auth/register",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });

            if(res.ok){
                navigate("/dashboard");
            }
            console.log(res);
        }catch(e){
            console.error(e);
        }

        // navigate("/dashboard");
    }

    return (
        <div className={`${LoginCss.background} ${LoginCss.baseflex}`} >
            <div>
                <header>
                    <h2>Welcome to Taskify</h2>
                </header>
                <main>
                    <form className={LoginCss.form} onSubmit={handleFormSubmit}>
                        <AuthInput type="email" name="email" label="Email Address" placeholder="Enter your email"/>
                        <AuthInput type="password" name="password" label="Password" placeholder="Enter your password"/>
                        <AuthButton text="Log in"/>
                    </form>
                    <div>
                        <p>Don't have an account? <Link className={LoginCss.link} to="/signup">Sign up</Link></p>
                    </div>
                </main>
                <footer></footer>
            </div>
        </div>
    );
}

export default Login;