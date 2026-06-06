import { useState } from "react";

function RefreshToken({open,closePopup}){
    const [count,setCount] = useState(300);

    if(!open) return null;

    const interval = setInterval(()=>{
        if(count<1){
            closePopup();
            clearInterval(interval);
        }
        setCount(prevCount => prevCount - 1);
    },1000);

    return (
    <div>
        <p>
            The Token Expires in {Math.floor(count/60)}:{count%60}
        </p>
        <div>
            <button>Refresh Token</button>
            <button>Cancel</button>
        </div>
    </div>
    );
}

export default RefreshToken;