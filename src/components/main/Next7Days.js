import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment/moment';
import { ToDoContext } from '../../context';
import Todo from './Todo'

const Next7Days = () => {
    const [weekTodos, setWeekTodos] = useState([]);

    const { todos } = useContext(ToDoContext);

    const days = [ 0, 1, 2, 3, 4, 5, 6 ]

    const sortTodosByDay = days.map( day => {
        return {
            todos: todos.filter( todo => todo.day === day ),
            number: day
        }
    });

    const today = parseInt(moment().format('d'));

    const arrangedTodos = sortTodosByDay.slice(today).concat(sortTodosByDay.slice(0, today));

    useEffect(() => setWeekTodos(arrangedTodos), [arrangedTodos]);

    return (
        <div className='Next7Days'>
            {
                weekTodos.map( day => 
                    <div key={day.number}>
                        <div className='day'>
                            <div className='name'>
                                {moment(day.number, "d").format("dddd")}
                                {day.number.toString() === moment().format("d") && ' (Today)'}
                            </div>
                            {
                                day.todos.length > 0 &&
                                    <div className='total-todos'>
                                        {day.todos.length}
                                    </div>
                            }
                        </div>
                        <div className='todos'>
                            {
                                day.todos.length > 0 ?
                                day.todos.map( todo => 
                                    <Todo key={todo.id} todo={todo} />
                                 )
                                :
                                <p className='open-day'>
                                    Open
                                </p>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Next7Days;