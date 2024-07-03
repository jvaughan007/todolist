import React, { useContext } from 'react';
import Todo from './Todo';
import Next7Days from './Next7Days';
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