import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import moment from 'moment/moment';
import TodoForm from '../main/TodoForm';
import Modal from '../Modal';
import { ToDoContext } from '../../context';
import { calendarItems } from '../../constants';
import { db } from '../../firebase/firebase';
import randomColor from 'randomcolor';
import { collection, addDoc } from 'firebase/firestore';


const AddNewTodo = () => {

    // Global Context
    const { selectedProject } = useContext(ToDoContext);

    // Local State
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('');
    const [day, setDay] = useState(dayjs());
    const [time, setTime] = useState(dayjs());
    const [remindMe, setRemindMe] = useState(false);
    const [toDoProject, setToDoProject] = useState(selectedProject);


    const projects = [
        { id: 1, name: "personal", numOfTodos: 0},
        { id: 2, name: "work", numOfTodos: 1},
        { id: 3, name: "other", numOfTodos: 2}
    ];

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        if( text && !calendarItems.includes(toDoProject)) {
            const newDoc = await addDoc(collection(db, "todos"), {
                checked: false,
                color: randomColor(),
                date: moment(day).format("DD/MM/YYY"),
                day: moment(day).format('d'),
                name: text,
                project: toDoProject,
                time: moment(time).format("hh:mm A"),
            });
            console.log(`Document written with ID: ${newDoc.id}`)
            setShowModal(!showModal);
            setText('');
            setDay(dayjs());
            setTime(dayjs());
            if (remindMe === true) {
                setRemindMe(false)
            }
        }
    }

    useEffect( () => {
        setToDoProject(selectedProject);
    }, [selectedProject]);

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
                    toDoProject={toDoProject}
                    setToDoProject={setToDoProject}
                />
            </Modal>
        </div>
    )
}

export default AddNewTodo;