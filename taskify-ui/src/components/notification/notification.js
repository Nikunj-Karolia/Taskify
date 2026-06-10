import { createContext, useEffect, useState } from 'react';
import notifyCss from './notification.module.css';

export const NotifyContext = createContext();

function Notification({children}){
    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState("");
    const [color,setColor] = useState('#ffffff');
    useEffect(()=>{
        if(!open) return;
        const timeout = setTimeout(()=>{
            setOpen(false);
        },1000);
        return ()=>{
            clearTimeout(timeout);
        }
    },[open]);
    
    function sendNotify(message,color = '#10B981'){
        setMessage(message);
        setColor(color);
        setOpen(true);
    }
    
    return(
        <NotifyContext.Provider value={sendNotify}>
            {open &&
            <div className={notifyCss.notify} style={{backgroundColor:color}}>
                {message}
            </div>
            }

            {children}
        </NotifyContext.Provider>
    );
}

export default Notification;