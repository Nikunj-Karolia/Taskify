import { Fragment, useEffect, useState } from "react";
import refreshCSS from './refreshtoken.module.css';
function RefreshToken({refreshExpires}){
    const [open,setOpen] = useState(false);
    const [count,setCount] = useState(300);

    useEffect(()=>{
        if(count<0){
            setOpen(false);
            return;
        }

        const interval = setInterval(()=>{
            setCount(prev=> prev -1);
        },1000);

        return ()=>{
            clearInterval(interval);
        }

    },[count]);

    function handleRefresh(){
        const d =  new Date();
        console.log("Login");
        console.log(d.toString());
        d.setTime(d.getTime() + 60 *1000);
        console.log(d.toString());
        setOpen(false);
        refreshExpires(d.toString());
    }

    function handleCancel(){
        setOpen(false);
    }

    if(!open) return null;

    return (
        <Fragment>
            <div className={refreshCSS.popup}>
                <p>
                    The Token Expires in {Math.floor(count/60).toString().padStart(2,'0')}:{(count%60).toString().padStart(2,'0')}
                </p>
                <div>
                    <button className={refreshCSS.refreshbtn} onClick={handleRefresh} >Refresh Token</button>
                    <button className={refreshCSS.cancelbtn} onClick={handleCancel}>Cancel</button>
                </div>
            </div>
            <div className={refreshCSS.backdrop}></div>
        </Fragment>
    );
}

export default RefreshToken;