import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";

import Login from './routes/login/Login';
import Signup from './routes/signup/Signup';
import Dashboard from './routes/dashboard/Dashboard';
import NewTask from './routes/new/NewTask';

function App() {
    const [task,setTask] = useState([]);
    useEffect(()=>{
        setTask([{
            name:'test1',
            desc:'Description for test1',
            status: 'active'
        },
        {
            name:'test2',
            desc:'Description for test2',
            status: 'inactive'
        }
    ]);
    },[]);
    function handleAddTask(task){

      setTask(prev=>([...prev,task]));
    }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard task={task}/>} />
        <Route path='/new' element={<NewTask createTask={handleAddTask}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
