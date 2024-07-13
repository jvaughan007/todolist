import React, { useState } from 'react';
import { CheckCircleFill, Circle, Trash3Fill, ArrowClockwise } from 'react-bootstrap-icons';
import { db } from '../../firebase/firebase';
import { doc, updateDoc, deleteDoc, addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';
import randomColor from 'randomcolor';

// dayjs Plugins
dayjs.extend(weekday);
dayjs.extend(calendar);
dayjs.extend(relativeTime);


const Todo = ( { todo } ) => {

    const [hover, setHover] = useState(false);
    const [todoCount, setTodoCount] = useState(todo.count);
    

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

    const handleRepeatTodo = async (todo) => {
        
        
        const queryForRepeats = query(
            collection(db, "todos"),
            where('name', '==', todo.name),
            where('repeated', '==', true),
            where('date', '==', dayjs(todo.date).add(1, 'day').format('MM/DD/YYYY'))
        );

        const querySnapshot = await getDocs(queryForRepeats);

        if (querySnapshot.docs.length === 0) {

           try {
                setTodoCount(todoCount + 1);

                const docRef = await addDoc(collection(db, "todos"), {
                    checked: !todo.checked,
                    color: randomColor(),
                    date: dayjs(todo.date).add(1, 'day').format('MM/DD/YYYY'),
                    day: dayjs(todo.date).add(1, 'day').weekday(),
                    name: `${todo.name}`,
                    project: todo.project,
                    time: todo.time,
                    repeated: true,
                    countRepeated: todoCount
                });

                console.log(`Todo repeated with ID: ${docRef.id}`);
            } catch (err) {
                console.log(`Error: ${err.message}`)
            }

         } else {
            console.log(querySnapshot.docs);
            console.log('Error: ToDo has already been repeated for the day')
         }
    }

    const calculateDays = (todoDate) => {
        const dateDiff =  dayjs().diff(todoDate, 'day');

        if (dateDiff >= 2) {
            return `(${dateDiff} DAYS LATE)`;
        } else if (dateDiff === 1) {
            return `(${dateDiff} DAY LATE)`;
        } else {
            return '';
        }
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
                        <span style={{color: "red"}}> {calculateDays(todo.date)} {todo.time} - {todo.project}</span>     
                        :
                        <span> {todo.time} - {todo.project} </span>
                    }

                    <div className={ `line ${ todo.checked ? 'line-through' : ''}` } />
                </div>
                <div className='add-to-next-day' onClick={() => handleRepeatTodo(todo)}>
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