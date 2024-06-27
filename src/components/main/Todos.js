import React from 'react';
import Todo from './Todo';
import Next7Days from './Next7Days'


const Todos = () => {

    return (
        <div className='Todos'>
            <Todo />
            <Next7Days />
        </div>
    )
}

export default Todos;