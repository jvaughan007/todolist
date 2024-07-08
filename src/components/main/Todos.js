import React, { useContext } from 'react';
import Todo from './Todo';
import Next7Days from './Next7Days';
import dayjs from 'dayjs';
import { ToDoContext } from '../../context';

const Todos = () => {
    const { selectedProject, todos } = useContext(ToDoContext);

    const today = dayjs().format("MM/DD/YYYY");

    const todayTodos = todos
        .filter(todo => dayjs(todo.date).format("MM/DD/YYYY") === today)
        .sort((a, b) => dayjs(a.date) - dayjs(b.date));

    return (
        <div className='Todos'>
            <div className='selected-project'>
                {selectedProject}
            </div>
            <div className='todos'>
                {
                    selectedProject === "next 7 days" ? (
                        <Next7Days todos={todos} />
                    ) : selectedProject === "today" ? (
                        todayTodos.length > 0 ? (
                            todayTodos.map(todo => (
                                <Todo todo={todo} key={todo.id} />
                            ))
                        ) : (
                            <p className='open-day'>Nothing To Do Today 🤷‍♂️</p>
                        )
                    ) : selectedProject === 'all days' ? (
                        todos.sort((a, b) => dayjs(a.date) - dayjs(b.date)).map(todo => (
                            <Todo todo={todo} key={todo.id} />
                        ))
                    ) : (
                        todos
                            .filter(todo => todo.project === selectedProject)
                            .sort((a, b) => dayjs(a.date) - dayjs(b.date))
                            .map(todo => (
                                <Todo todo={todo} key={todo.id} />
                            ))
                    )
                }
            </div>
        </div>
    );
};

export default Todos;
