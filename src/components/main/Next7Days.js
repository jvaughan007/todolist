import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday'
import { ToDoContext } from '../../context';
import Todo from './Todo'

// dayjs Plugins
dayjs.extend(weekday);

const Next7Days = () => {
    const [weekTodos, setWeekTodos] = useState([]);

    const { todos } = useContext(ToDoContext);

    useEffect(() => { 
        const days = [ 0, 1, 2, 3, 4, 5, 6 ]

        const sortTodosByDay = days.map( day => {
            return {
                todos: todos.filter( todo => todo.day === day && dayjs(todo.date, "MM/DD/YYYY").isAfter(dayjs(), 'day') && (dayjs().diff(todo.date, 'day')) > -6),
                number: day
            }
        });

        const today = parseInt(dayjs().format('d'));

        const arrangedTodos = sortTodosByDay.slice(today).concat(sortTodosByDay.slice(0, today));

        setWeekTodos(arrangedTodos);

    }, [todos]);

    return (
        <div className='Next7Days'>
            {
                weekTodos.map( day => 
                    <div key={day.number}>
                        <div className='day'>
                            <div className='name'>
                                {dayjs().weekday(day.number).format("dddd")}
                                {day.number === dayjs().weekday() && " (Today)"}
                            </div>
                            { 
                                day.todos.length > 0 && day.todos.filter(todo => todo.date > dayjs().format("MM/DD/YYYY")).length > 0 ?
                                    <div className='total-todos'>
                                        {day.todos.filter(todo => todo.date > dayjs().format("MM/DD/YYYY")).length}
                                    </div>
                                :
                                    ""
                            }
                        </div>
                        <div className='todos'>
                            {
                                day.todos.length > 0 ?
                                day.todos.map( todo => 
                                //    <p>{(dayjs().diff(todo.date, 'day'))}</p>
                                    todo.date >= dayjs().format("MM/DD/YYYY")  && 
                                    <Todo key={todo.id} todo={todo} />
                                 )
                                :
                                <p className='day-open'>
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