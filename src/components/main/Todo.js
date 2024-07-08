import React, { useState } from 'react';
import { CheckCircleFill, Circle, Trash3Fill, ArrowClockwise } from 'react-bootstrap-icons';
import { db } from '../../firebase/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import dayjs from 'dayjs';


const Todo = ( { todo } ) => {

    const [hover, setHover] = useState(false);
    

    const handleChecked = async (e) => {
        e.preventDefault();

        const docRef = doc(db, "todos", todo.id);

        await updateDoc(docRef, {
            checked: !todo.checked
        })
    }

    const handleDeleteTodo = async (todo) => {
        await deleteDoc(doc(db, 'todos', todo.id));
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
                        dayjs(todo.date, "MM/DD/YYYY").isBefore(dayjs(), 'day') && !todo.checked ? 
                        <span style={{color: "red"}}> {todo.time} - {todo.project} (LATE/MISSED)</span>     
                        :
                        <span> {todo.time} - {todo.project} </span>
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
                <div 
                    className='delete-todo'
                    onClick={() => handleDeleteTodo(todo)}
                >
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