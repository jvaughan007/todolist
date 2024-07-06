import React, { useContext } from 'react';
import Todo from './Todo';
import Next7Days from './Next7Days';
import dayjs from 'dayjs';
import { ToDoContext } from '../../context';



const Todos = () => {
    const { selectedProject, todos } = useContext(ToDoContext);

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
                        selectedProject === "today" ?
                            todos.sort((a, b) => {
                                const dateA = dayjs(a.date);
                                const dateB = dayjs(b.date);

                                if (dateA < dateB) {
                                    return -1;
                                }

                                if (dateA > dateB) {
                                    return 1;
                                }

                                return 0;
                            }).map( todo => 
                                dayjs(new Date()).format("MM/DD/YYYY") === dayjs(todo.date).format("MM/DD/YYYY") &&
                                    <Todo todo={todo} key={todo.key}/>
                            )
                        :
                            todos.sort((a, b) => {
                                const dateA = dayjs(a.date);
                                const dateB = dayjs(b.date);

                                if (dateA < dateB) {
                                    return -1;
                                }

                                if (dateA > dateB) {
                                    return 1;
                                }

                                return 0;
                            }).map( todo => 
                                <Todo todo={todo} key={todo.key} />
                            )
                }
            </div>
        </div>
    )
}

export default Todos;