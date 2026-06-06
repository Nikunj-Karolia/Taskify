import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import AuthInput from "../../components/authinput/input";
import AuthButton from "../../components/authbutton/button";

import LoginCss from "../login/Login.module.css";

function Signup(){
    const navigate = useNavigate();
    async function handleFormSubmit(e){
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
                navigate("/");
            }
            console.log(res);
        }catch(e){
            console.error(e);
        }
    }
    return (
        <div className={`${LoginCss.background} ${LoginCss.baseflex}`}>
            <main>
                <header>
                    <h3>Sign up</h3>
                </header>
                <form onSubmit={handleFormSubmit}>
                    <AuthInput type="email" name="email" label="Email Address" placeholder="Enter your email" required={true} />
                    <AuthInput type="password" name="password" label="Password" placeholder="Enter your password" required={true}/>
                    <AuthInput type="password" name="confpass" label="Confirm Password" placeholder="Confirm your password" required={true}/>
                    <AuthInput type="date" name="dob" label="Date of birth" placeholder="Enter your date of birth"/>
                    <AuthButton text="Sign up"/>
                </form>
                <div>
                    <p>Already have an account? <Link className={LoginCss.link} to="/">Log in</Link></p>
                </div>
                <footer></footer>
            </main>
        </div>
    );
}

export default Signup;