import AuthInputCss from "./input.module.css"

function AuthInput({type= 'text',name = '',placeholder = '',label = '',required=false}){
    return (
        <div className={AuthInputCss.inputwrapper}>
            <div className={AuthInputCss.inputlabel}>
                <label htmlFor={name}>{label}</label>
            </div>
            <div>
                <input className={AuthInputCss.input} type={type} name={name} placeholder={placeholder} required={required}/>
            </div>
        </div>
    );
}

export default AuthInput;