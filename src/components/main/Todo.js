import React, { useState } from 'react';
import { CheckCircleFill, Circle, Trash3Fill, ArrowClockwise } from 'react-bootstrap-icons';
import { db } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
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
                       ( dayjs(new Date()).format("MM/DD/YYYY") === dayjs(todo.date).format("MM/DD/YYYY") && todo.time > dayjs(new Date()).format("hh:mm A") ) || todo.checked === true ? 
                        <span> {todo.time} - {todo.project} </span>
                        :
                        <span style={{color: "red"}}> {todo.time} - {todo.project} (LATE/MISSED)</span>     
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