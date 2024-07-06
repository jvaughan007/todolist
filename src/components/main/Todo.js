import React, { useState, useContext } from 'react';
import { CheckCircleFill, Circle, Trash3Fill, ArrowClockwise, PencilFill } from 'react-bootstrap-icons';
import { db } from '../../firebase/firebase';
import moment from 'moment';
import { doc, updateDoc } from 'firebase/firestore';
import { ToDoContext } from '../../context';

const Todo = ( { todo } ) => {

    // Global Context
    const { edit, setEdit } = useContext(ToDoContext);

    const [hover, setHover] = useState(false);
    const pencilColor = edit ? "#2ec52e" : "#000000";
    

    const handleChecked = async (e) => {
        e.preventDefault();

        const docRef = doc(db, "todos", todo.id);

        await updateDoc(docRef, {
            checked: !todo.checked
        })
    }

    return (
        <div className='Todo'>
            <div
                className='todo-container'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className='check-todo' onClick={handleChecked}>
                    {
                        todo.checked ?
                        <span className='checked'>
                            <CheckCircleFill color='#bebebe' size='18' />
                        </span>
                        :
                        <span className='unchecked'>
                            <Circle color={todo.color} />
                        </span>
                    }
                </div>
                <div className='name'>
                    <p style={{color: todo.checked ? '#bebebe' : '#000'}}>{todo.name}</p>
                    {
                        moment().format('d') <= moment(todo.date).format('d') ? 
                        <span> {todo.time} - {todo.project} </span>
                        :
                        <span style={{color: "red"}}>Missed Todo</span>     
                    }

                    <div className={ `line ${ todo.checked ? 'line-through' : ''}` } />
                </div>
                <div className='add-to-next-day'>
                    {
                        (todo.checked) &&
                        <span>
                            <ArrowClockwise />
                        </span>
                    }
                </div>
                <div className='delete-todo'>
                    {
                        
                        (hover || todo.checked) &&
                        <span>
                            <Trash3Fill />
                        </span>
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo;