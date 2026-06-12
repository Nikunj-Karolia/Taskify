import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import Header from "../../components/header/header";

import EditBtn from "../../components/editbutton/edit";
import DeleteBtn from "../../components/deletebutton/delete";

import AuthButtonCss from "../../components/authbutton/button.module.css";
import DashboardCss from "./Dashboard.module.css";
import { useContext, useEffect } from "react";

import { NotifyContext } from "../../components/notification/notification"; 

// {
//     "name":"fbvsgb",
//     "desc":"afvskjbs"
// }

function Dashboard({task, deleteTask,expires,setTask}){
    const navigate = useNavigate();

    const handleNotify = useContext(NotifyContext);

    function handleNewTask(element){
        navigate("/new");
    }

    function handleEdit(event,id){
        event.preventDefault();
        navigate(`/edit/${id}`);
    }

    useEffect(()=>{

        const d = new Date();
        const e =  new Date(expires);
        const time = e-d;

        if(time <1){
            navigate("/");
        }
        
        const timeout = setTimeout(function(){
            navigate("/");
        },time);
        
        return () => {
            clearTimeout(timeout);
        };
    },[expires]);
    
    async function loadTask(){

        try {
            const res = await fetch("/api/task",{
                method:'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();
            if(res.ok){
                setTask(json);
            }else{
                throw new Error(JSON.stringify(json));
            }
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function handleDelete(event, id){
        event.preventDefault();
        try {
            const res = await fetch(`/api/task/${id}`,{
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();
            if(res.ok){
                handleNotify('Task Deleted');
                deleteTask(event,id);
            }
            else{
                handleNotify('Operation Failed','#EF4444');
                console.error(json);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        loadTask();
    },[]);

    return (
        <Fragment>
            <Header>
                <h2 style={{margin: 0}}>Taskify - Dashboard</h2>
            </Header>
            <main className={DashboardCss.main}>
                <div className={DashboardCss.table}>
                    <table>
                        <caption>Tasks</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {task.map((element,index) => (
                                <tr key={index}>
                                    <td>{element.name}</td>
                                    <td>{element.desc}</td>
                                    <td style={{display: "inline-flex"}}>
                                        <EditBtn onClick={e=>handleEdit(e,element.id)}/>
                                        <DeleteBtn onClick={ e=>handleDelete(e, element.id)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}>
                                    <button onClick={handleNewTask} className={AuthButtonCss.button}> Create Task</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </main>
            <footer></footer>
        </Fragment>
    );
}

export default Dashboard;