import AuthInputCss from "./input.module.css"

function AuthInput({label = '',name = '',...rest}){
    return (
        <div className={AuthInputCss.inputwrapper}>
            <div className={AuthInputCss.inputlabel}>
                <label htmlFor={name}>{label}</label>
            </div>
            <div>
                <input name={name} className={AuthInputCss.input} {...rest}/>
            </div>
        </div>
    );
}

export default AuthInput;