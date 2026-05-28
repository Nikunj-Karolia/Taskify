import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import Header from "../../components/header/header";

import AuthButtonCss from "../../components/authbutton/button.module.css";
import DashboardCss from "./Dashboard.module.css";

// {
//     "name":"fbvsgb",
//     "desc":"afvskjbs",
//     "status":"active"
// }

function Dashboard({task}){
    const navigate = useNavigate();
    function handleNewTask(element){
        navigate("/new");
    }
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
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {task.map((element,index) => (
                                <tr key={index}>
                                    <td>{element.name}</td>
                                    <td>{element.desc}</td>
                                    <td>{element.status}</td>
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