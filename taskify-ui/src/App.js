import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

import Login from './routes/login/Login';
import Signup from './routes/signup/Signup';
import Dashboard from './routes/dashboard/Dashboard';
import NewTask from './routes/new/NewTask';
import RefreshToken from './components/refreshtoken/refreshtoken';

function App() {
    const [task,setTask] = useState([]);
    const [expires,setExpires] = useState((new Date()).toString());
    const [open,setOpen] = useState(false);
    const {id} = useParams();
    useEffect(()=>{
        setTask([{
          id: 1,
          name:'test1',
          desc:'Description for test1',
        },
        {
          id: 2,
          name:'test2',
          desc:'Description for test2',
        }
    ]);
    },[]);

    function getTask(id){
      return task.find(prev => prev.id == id);
    }

    function handleAddTask(task){
      
      setTask(prev=>([...prev,task]));
    }

    function deleteTask(e,id){
      e.preventDefault();
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


    function closePopup(){
      setOpen(false);
    }
  return (   
    <BrowserRouter>
      <RefreshToken open={open} closePopup={closePopup} refreshExpires={setExpires}/>
      <Routes>
        <Route path='/' element={<Login setLogout={setExpires}/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard task={task} expires={expires} deleteTask={deleteTask}/>} />
        <Route path='/new' element={<NewTask edit={false} expires={expires} createTask={handleAddTask}/>} />
        <Route path='/edit/:id' element={<NewTask edit={true} expires={expires} getTask={getTask}  createTask={updateTask}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
