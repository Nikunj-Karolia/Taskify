import { Fragment } from "react/jsx-runtime";

import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import DashboardCss from "../dashboard/Dashboard.module.css";

import AuthInput from "../../components/authinput/input";
import AuthButton from "../../components/authbutton/button";

import LoginCss from "../login/Login.module.css";
import { useEffect, useRef } from "react";

function NewTask({createTask, getTask, edit, expires}){
    const navigate = useNavigate();
    const {id} = useParams();

    const name = useRef();
    const desc= useRef();

    async function handleFormSubmit(e){
        e.preventDefault();
        const formElem = e.target;
        const formData = new FormData(formElem);
        var formObject = Object.fromEntries(formData.entries());
        // handle Api call here

        if(edit){
            formObject.id = id;
        }


        // try{
        //     const res =  await fetch("http://localhost:5000/api/task",{
        //         method: edit ? 'PATCH': 'POST',
        //         headers:{
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(formObject)
        //     });

        //     if(res.ok){
        //         navigate("/dashboard");
        //         createTask(formObject);
        //     }
        // }catch(e){
        //     console.error(e);
        // }
        navigate("/dashboard");
        createTask(formObject);
    }

    useEffect(()=>{

        const d = new Date();
        const e =  new Date(expires);

        const time = e-d;

        if(time<1){
            navigate("/");
        }

        const timeout = setTimeout(function(){
            navigate("/");
        },time);
        
        return () => {
            clearTimeout(timeout);
        };
    },[]);

    useEffect(()=>{
        if(edit){
            const val = getTask(id);
            name.current.value = val.name;
            desc.current.value = val.desc;
        }
    },[edit]);
    return (
        <Fragment>
            <Header>
                <h2 style={{margin: 0}}>Taskify - New Task</h2>
            </Header>
            <main className={DashboardCss.main}>
                <form className={LoginCss.form} onSubmit={handleFormSubmit}>
                    <AuthInput type="text" name="name" {...(edit && {ref:name})} label="Task Name" placeholder="Enter task name"/>
                    <AuthInput type="text" name="desc" {...(edit && {ref:desc})} label="Descripton" placeholder="Enter description"/>
                    {/* <AuthInput type="text" name="status" {...(edit && {value:task.desc})} label="Status" placeholder="Enter status"/> */}
                    <AuthButton text="Create task"/>
                </form>
            </main>
            <footer></footer>
        </Fragment>
    )
}

export default NewTask;