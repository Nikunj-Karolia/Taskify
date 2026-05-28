import AuthButtonCss from "./button.module.css";


function AuthButton({text}){
    return (
        <div>
            <button className={AuthButtonCss.button} type="submit">{text}</button>
        </div>
    );
}

export default AuthButton;