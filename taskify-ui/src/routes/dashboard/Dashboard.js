import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import Header from "../../components/header/header";

import EditBtn from "../../components/editbutton/edit";
import DeleteBtn from "../../components/deletebutton/delete";

import AuthButtonCss from "../../components/authbutton/button.module.css";
import DashboardCss from "./Dashboard.module.css";
import { useEffect } from "react";

// {
//     "name":"fbvsgb",
//     "desc":"afvskjbs"
// }

function Dashboard({task, deleteTask,expires}){
    const navigate = useNavigate();
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
                                        <DeleteBtn onClick={ e=>deleteTask(e, element.id)}/>
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