import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import AuthInput from "../../components/authinput/input";
import AuthButton from "../../components/authbutton/button";

import LoginCss from "../login/Login.module.css";
import { useRef } from "react";

function Signup(){
    const navigate = useNavigate();

    const inputRef = useRef(null);

    async function handleFormSubmit(e){
        e.preventDefault();
        const formElem = e.target;
        const formData = new FormData(formElem);
        const formObject = Object.fromEntries(formData.entries());
        // handle Api call here

        if(formObject.password !== formObject.confpass){
            inputRef.current.setCustomValidity('The password is not same');
            inputRef.current.reportValidity();
            return;
        }
        delete formObject.confpass;

        try{
            const res = await fetch("/api/auth/register",{
                method: 'POST',
                credentials: "include",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });
            const json = await res.json();

            if(res.ok){
                navigate("/");
            }
            else{
                console.error(json.message);
            }
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
                    <AuthInput type="password" name="confpass" label="Confirm Password" ref={inputRef} placeholder="Confirm your password" required={true}/>
                    <AuthInput type="text" name="phone_number" label="Phone Number" maxLength={10} pattern="^[0-9]+$" placeholder="Enter your phone number"/>
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