import React from 'react';

const Todo = ({todo}) => {

    return (
        <div className='Todo'>
            {todo.name}
        </div>
    )
}

export default Todo;