import React, { useState } from 'react';
import TodoForm from './TodoForm';
import dayjs from 'dayjs';

const EditTodo = () => {

    const [text, setText] = useState('');
    const [day, setDay] = useState(dayjs());
    const [time, setTime] = useState(dayjs());
    const [remindMe, setRemindMe] = useState(false);
    const [toDoProject, setToDoProject] = useState();

    const projects = [
        {
            id: 1,
            name: "personal",
            numOfTodos: 0
        },
        {
            id: 2,
            name: "work",
            numOfTodos: 1
        },
        {
            id: 3,
            name: "other",
            numOfTodos: 2
        }
    ]

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleRemindChange = (e) => {
        e.preventDefault();
        if (!remindMe) {
            setRemindMe(true);
        } 

        if (remindMe) {
            setRemindMe(false);
        }
    }

    const handleSubmit = (e) => {
        
    }

    return (
        <div className='EditTodo'>
           <div className='header'>
                Edit Todo
           </div>
           <div className='container'>
                <TodoForm 
                    handleSubmit={handleSubmit}
                    text={text}
                    handleTextChange={handleTextChange}
                    day={day}
                    setDay={setDay}
                    remindMe={remindMe}
                    handleRemindChange={handleRemindChange}
                    time={time}
                    setTime={setTime}
                    projects={projects}
                    toDoProject={toDoProject}
                    setToDoProject={setToDoProject}
                />
           </div>
        </div>
    )
}

export default EditTodo;