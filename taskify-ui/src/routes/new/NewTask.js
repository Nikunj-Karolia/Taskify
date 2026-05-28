import { Fragment } from "react/jsx-runtime";

import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import DashboardCss from "../dashboard/Dashboard.module.css";

import AuthInput from "../../components/authinput/input";
import AuthButton from "../../components/authbutton/button";

import LoginCss from "../login/Login.module.css";

function NewTask({createTask}){
    const navigate = useNavigate();
    function handleFormSubmit(e){
        e.preventDefault();
        const formElem = e.target;
        const formData = new FormData(formElem);
        const formObject = Object.fromEntries(formData.entries());
        // handle Api call here

        try{
            const res = await fetch("http://localhost:5000/api/task",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });

            if(res.ok){
                navigate("/dashboard");
                createTask(formObject);
            }
            console.log(res);
        }catch(e){
            console.error(e);
        }
    }
    return (
        <Fragment>
            <Header>
                <h2 style={{margin: 0}}>Taskify - New Task</h2>
            </Header>
            <main className={DashboardCss.main}>
                <form className={LoginCss.form} onSubmit={handleFormSubmit}>
                    <AuthInput type="text" name="name" label="Task Name" placeholder="Enter task name"/>
                    <AuthInput type="text" name="desc" label="Descripton" placeholder="Enter description"/>
                    <AuthInput type="text" name="status" label="Status" placeholder="Enter status"/>
                    <AuthButton text="Create task"/>
                </form>
            </main>
            <footer></footer>
        </Fragment>
    )
}

export default NewTask;