import { Fragment, useEffect, useState } from "react";
import refreshCSS from './refreshtoken.module.css';
function RefreshToken({expires,refreshExpires}){
    const [open,setOpen] = useState(false);
    const [count,setCount] = useState(300);

    useEffect(()=>{
        const d= new Date();
        const e = new Date(expires);

        if(!open) return;

        const timeout = (e-d>300000) ? setTimeout(()=>{
            setOpen(true);
        },e-d-300000) :setOpen(true);
        return ()=>{
            setCount(300);
            clearTimeout(timeout);
        }
    },[open,expires]);

    useEffect(()=>{

        if(!open){
            return;
        }

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

    },[open,count]);

    async function handleRefresh(event){
        const d =  new Date();
        event.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/refresh",{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await (await res).json();
            if(res.ok){
                d.setTime(d.getTime() + 3600 *1000);
                setOpen(false);
                refreshExpires(d.toString());
            }else{
                console.error(json);
            }
        } catch (error) {
            console.error(error);
        }
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