import React, { useContext } from 'react';
import Todo from './Todo';
import Next7Days from './Next7Days';
import { ToDoContext } from '../../context';



const Todos = () => {
    const { selectedProject } = useContext(ToDoContext);

    const todos = [
        {
            id: 'd56yx7',
            name: 'Coffee Standup',
            time: '10:00 AM',
            date: '06/28/2024', 
            day: 6,
            checked: false,
            color: '#000000',
            project: 'work',
        },
        {
            id: 'r97gh2',
            name: 'Go Fishing',
            time: '06:00 AM',
            date: '07/01/2024', 
            day: 1,
            checked: true,
            color: '#00ff00',
            project: 'other',
        },
        {
            id: 'q43em8',
            name: 'Anniversary Dinner',
            time: '06:30 PM',
            date: '07/03/2024', 
            day: 3,
            checked: false,
            color: '#000000',
            project: 'other',
        },
    ]

    return (
        <div className='Todos'>
            <div className='selected-project'>
                { selectedProject }
            </div>
            <div className='todos'>
                {
                    selectedProject === "next 7 days" ?
                        <Next7Days todos={todos} />
                        :
                        todos.map( todo => {
                            return (
                            <Todo todo={todo} key={todo.key} />
                            )
                        })

                }
            </div>
        </div>
    )
}

export default Todos;