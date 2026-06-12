import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

import Login from './routes/login/Login';
import Signup from './routes/signup/Signup';
import Dashboard from './routes/dashboard/Dashboard';
import NewTask from './routes/new/NewTask';
import RefreshToken from './components/refreshtoken/refreshtoken';
import  Notification from './components/notification/notification';

function App() {
    const [task,setTask] = useState([]);
    const [expires,setExpires] = useState((new Date()).toString());
    const {id} = useParams();

    function getTask(id){
      return task.find(prev => prev.id == id);
    }

    function handleAddTask(task){
      
      setTask(prev=>([...prev,task]));
    }

    function deleteTask(e,id){
      setTask(prev=> prev.filter(data => data.id !== id));
    }

    function updateTask(task){
      setTask(prev => prev.map(data => {
        if(data.id == task.id){
          return task;
        }
        return data;
      }));
    }

  return (   
    <BrowserRouter>
      <RefreshToken expires={expires} refreshExpires={setExpires}/>
      <Notification>
      <Routes>
        <Route path='/' element={<Login setLogout={setExpires}/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard task={task} expires={expires} deleteTask={deleteTask} setTask={setTask}/>} />
        <Route path='/new' element={<NewTask edit={false} expires={expires} createTask={handleAddTask}/>} />
        <Route path='/edit/:id' element={<NewTask edit={true} expires={expires} getTask={getTask}  createTask={updateTask}/>} />
      </Routes>
      </Notification>
    </BrowserRouter>
  );
}

export default App;
