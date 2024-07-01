import React, { useState } from 'react';
import dayjs from 'dayjs';
import TodoForm from '../main/TodoForm';
import Modal from '../Modal';


const AddNewTodo = () => {
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('');
    const [day, setDay] = useState(dayjs());
    const [time, setTime] = useState(dayjs());
    const [remindMe, setRemindMe] = useState(false);

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
        <div className='AddNewTodo'>
            <div className='button'>
                <button onClick={() => setShowModal(true)}>
                    + New Todo
                </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <TodoForm 
                    handleSubmit={handleSubmit}
                    heading='Add a New Todo!'
                    text={text}
                    handleTextChange={handleTextChange}
                    day={day}
                    setDay={setDay}
                    remindMe={remindMe}
                    handleRemindChange={handleRemindChange}
                    time={time}
                    setTime={setTime}
                    projects={projects}
                    showButtons={true}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </Modal>
        </div>
    )
}

export default AddNewTodo;