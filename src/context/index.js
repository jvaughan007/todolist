import React, { createContext, useState } from "react";
import { useTodos, useProjects } from "../hooks";

const ToDoContext = createContext();

const ToDoContextProvider = ({ children }) => {

    const defaultProject = 'today';
    const [selectedProject, setSelectedProject] = useState(defaultProject);

    const todos = useTodos();
    const projects = useProjects(todos);

    return (
        <ToDoContext.Provider 
            value={
                {
                    selectedProject,
                    setSelectedProject,
                    todos,
                    projects
                }
            }
        >
            {children}
        </ToDoContext.Provider>
    )
}

export { ToDoContextProvider, ToDoContext };